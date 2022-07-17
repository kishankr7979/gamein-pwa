import { createClient } from "@supabase/supabase-js";
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from "./constants";
console.log(process.env.REACT_APP_SUPABASE_URL);
export const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_KEY
);