-- Enable RLS
-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    split_part(NEW.email, '@', 1)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Countries table
CREATE TABLE IF NOT EXISTS public.countries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  flag_emoji TEXT NOT NULL,
  semifinal INTEGER, -- 1 or 2 (NULL = direct finalist)
  is_direct_finalist BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0
);

INSERT INTO public.countries (name, code, flag_emoji, semifinal, is_direct_finalist, display_order) VALUES
-- Big 5 + Host (direct finalists)
('França', 'FR', '🇫🇷', NULL, TRUE, 1),
('Alemanha', 'DE', '🇩🇪', NULL, TRUE, 2),
('Itália', 'IT', '🇮🇹', NULL, TRUE, 3),
('Espanha', 'ES', '🇪🇸', NULL, TRUE, 4),
('Reino Unido', 'GB', '🇬🇧', NULL, TRUE, 5),
('Suíça', 'CH', '🇨🇭', NULL, TRUE, 6),
-- Semi-Final 1
('Noruega', 'NO', '🇳🇴', 1, FALSE, 10),
('Islândia', 'IS', '🇮🇸', 1, FALSE, 11),
('Croácia', 'HR', '🇭🇷', 1, FALSE, 12),
('Grécia', 'GR', '🇬🇷', 1, FALSE, 13),
('Portugal', 'PT', '🇵🇹', 1, FALSE, 14),
('Azerbaijão', 'AZ', '🇦🇿', 1, FALSE, 15),
('Moldávia', 'MD', '🇲🇩', 1, FALSE, 16),
('Eslovênia', 'SI', '🇸🇮', 1, FALSE, 17),
('Dinamarca', 'DK', '🇩🇰', 1, FALSE, 18),
('Albânia', 'AL', '🇦🇱', 1, FALSE, 19),
('Armênia', 'AM', '🇦🇲', 1, FALSE, 20),
('Rep. Tcheca', 'CZ', '🇨🇿', 1, FALSE, 21),
('Finlândia', 'FI', '🇫🇮', 1, FALSE, 22),
('Letônia', 'LV', '🇱🇻', 1, FALSE, 23),
('Malta', 'MT', '🇲🇹', 1, FALSE, 24),
('Polônia', 'PL', '🇵🇱', 1, FALSE, 25),
('Romênia', 'RO', '🇷🇴', 1, FALSE, 26),
-- Semi-Final 2
('Áustria', 'AT', '🇦🇹', 2, FALSE, 30),
('Bélgica', 'BE', '🇧🇪', 2, FALSE, 31),
('Chipre', 'CY', '🇨🇾', 2, FALSE, 32),
('Estônia', 'EE', '🇪🇪', 2, FALSE, 33),
('Geórgia', 'GE', '🇬🇪', 2, FALSE, 34),
('Irlanda', 'IE', '🇮🇪', 2, FALSE, 35),
('Israel', 'IL', '🇮🇱', 2, FALSE, 36),
('Lituânia', 'LT', '🇱🇹', 2, FALSE, 37),
('Macedônia do Norte', 'MK', '🇲🇰', 2, FALSE, 38),
('Sérvia', 'RS', '🇷🇸', 2, FALSE, 39),
('Suécia', 'SE', '🇸🇪', 2, FALSE, 40),
('Países Baixos', 'NL', '🇳🇱', 2, FALSE, 41),
('Montenegro', 'ME', '🇲🇪', 2, FALSE, 42),
('Bulgária', 'BG', '🇧🇬', 2, FALSE, 43),
('Austrália', 'AU', '🇦🇺', 2, FALSE, 44),
('Ucrânia', 'UA', '🇺🇦', 2, FALSE, 45),
('San Marino', 'SM', '🇸🇲', 2, FALSE, 46),
('Luxemburgo', 'LU', '🇱🇺', 2, FALSE, 47);

-- Semifinal predictions
CREATE TABLE IF NOT EXISTS public.semifinal_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  semifinal INTEGER NOT NULL,
  country_id INTEGER REFERENCES public.countries(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, semifinal, country_id)
);
ALTER TABLE public.semifinal_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all semifinal predictions" ON public.semifinal_predictions FOR SELECT USING (true);
CREATE POLICY "Users can manage their own semifinal predictions" ON public.semifinal_predictions FOR ALL USING (auth.uid() = user_id);

-- Final predictions
CREATE TABLE IF NOT EXISTS public.final_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  country_id INTEGER REFERENCES public.countries(id) NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, country_id),
  UNIQUE(user_id, position)
);
ALTER TABLE public.final_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all final predictions" ON public.final_predictions FOR SELECT USING (true);
CREATE POLICY "Users can manage their own final predictions" ON public.final_predictions FOR ALL USING (auth.uid() = user_id);

-- Actual results
CREATE TABLE IF NOT EXISTS public.actual_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  result_type TEXT NOT NULL CHECK (result_type IN ('semifinal1', 'semifinal2', 'final')),
  country_id INTEGER REFERENCES public.countries(id) NOT NULL,
  qualified BOOLEAN,
  position INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(result_type, country_id)
);
ALTER TABLE public.actual_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Results are viewable by everyone" ON public.actual_results FOR SELECT USING (true);
CREATE POLICY "Only admins can insert results" ON public.actual_results FOR ALL USING (auth.role() = 'service_role');

-- Leaderboard view
CREATE OR REPLACE VIEW public.leaderboard AS
WITH sf1_scores AS (
  SELECT
    sp.user_id,
    COUNT(*) FILTER (WHERE ar.qualified = TRUE) * 5 AS sf1_points
  FROM public.semifinal_predictions sp
  JOIN public.actual_results ar ON ar.country_id = sp.country_id AND ar.result_type = 'semifinal1'
  WHERE sp.semifinal = 1
  GROUP BY sp.user_id
),
sf2_scores AS (
  SELECT
    sp.user_id,
    COUNT(*) FILTER (WHERE ar.qualified = TRUE) * 5 AS sf2_points
  FROM public.semifinal_predictions sp
  JOIN public.actual_results ar ON ar.country_id = sp.country_id AND ar.result_type = 'semifinal2'
  WHERE sp.semifinal = 2
  GROUP BY sp.user_id
),
final_scores AS (
  SELECT
    fp.user_id,
    SUM(
      CASE
        WHEN fp.position = ar.position THEN 12
        WHEN ABS(fp.position - ar.position) = 1 THEN 8
        WHEN ABS(fp.position - ar.position) = 2 THEN 5
        WHEN ABS(fp.position - ar.position) = 3 THEN 3
        WHEN ABS(fp.position - ar.position) <= 5 THEN 1
        ELSE 0
      END
    ) AS final_points
  FROM public.final_predictions fp
  JOIN public.actual_results ar ON ar.country_id = fp.country_id AND ar.result_type = 'final'
  GROUP BY fp.user_id
)
SELECT
  p.id AS user_id,
  p.full_name,
  p.username,
  p.avatar_url,
  COALESCE(sf1.sf1_points, 0) AS sf1_points,
  COALESCE(sf2.sf2_points, 0) AS sf2_points,
  COALESCE(fs.final_points, 0) AS final_points,
  COALESCE(sf1.sf1_points, 0) + COALESCE(sf2.sf2_points, 0) + COALESCE(fs.final_points, 0) AS total_points
FROM public.profiles p
LEFT JOIN sf1_scores sf1 ON sf1.user_id = p.id
LEFT JOIN sf2_scores sf2 ON sf2.user_id = p.id
LEFT JOIN final_scores fs ON fs.user_id = p.id
ORDER BY total_points DESC;
