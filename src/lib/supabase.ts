import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with optimized settings
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-my-custom-header': 'clinic-app'
    }
  }
});

// Add a debug function to check connection
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    console.log('Supabase connection successful');
    return true;
  } catch (err) {
    console.error('Supabase connection error:', err);
    return false;
  }
};

// Comprehensive test function for debugging
export const testSupabaseSetup = async () => {
  console.log('=== Testing Supabase Setup ===');
  
  // Test 1: Check environment variables
  console.log('1. Environment variables:');
  console.log('   VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('   VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
  
  // Test 2: Check authentication
  console.log('2. Authentication status:');
  const { data: { session } } = await supabase.auth.getSession();
  console.log('   Session:', session ? '✅ Active' : '❌ No session');
  if (session?.user) {
    console.log('   User ID:', session.user.id);
  }
  
  // Test 3: Check database tables
  console.log('3. Database tables:');
  
  // Test appointments table
  const { data: appointmentsTest, error: appointmentsError } = await supabase
    .from('appointments')
    .select('id')
    .limit(1);
  
  if (appointmentsError) {
    console.log('   Appointments table:', '❌ Error:', appointmentsError.message);
  } else {
    console.log('   Appointments table:', '✅ Accessible');
  }
  
  // Test user_profiles table
  const { data: profilesTest, error: profilesError } = await supabase
    .from('user_profiles')
    .select('id')
    .limit(1);
  
  if (profilesError) {
    console.log('   User profiles table:', '❌ Error:', profilesError.message);
  } else {
    console.log('   User profiles table:', '✅ Accessible');
  }
  
  console.log('=== End Supabase Setup Test ===');
};

// Types for user registration
export interface UserRegistrationData {
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  age: string;
}

export interface AuthError {
  message: string;
}