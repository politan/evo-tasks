import { Database } from "@/models/supabase";
import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";

dotenv.config();

type SupabaseConfig = {
    supabaseUrl: string;
    supabaseKey: string;
};

export const supabaseConfig: SupabaseConfig = {
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_KEY!
};

export const supabase = createClient<Database>(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey);