# Supabase Setup Guide

This guide will help you set up Supabase authentication with OTP verification for the clinic application.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `clinic-app` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose the closest region to your users
5. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy the following values:
   - Project URL
   - Anon public key

## 3. Set Up Environment Variables

1. Create a `.env` file in your project root
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace the values with your actual Supabase project credentials.

## 4. Set Up Database Schema

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Click "Run" to execute the SQL

This will create:
- `user_profiles` table
- Row Level Security policies
- Trigger for automatic profile creation
- Indexes for better performance

## 5. Configure Authentication Settings

1. Go to Authentication → Settings in your Supabase dashboard
2. Configure the following:

### Email Templates
- Customize the confirmation email template
- Set your site URL
- Configure redirect URLs

### Site URL
- Add your development URL: `http://localhost:5173`
- Add your production URL when deployed

### Redirect URLs
- Add: `http://localhost:5173/login`
- Add: `http://localhost:5173/register`
- Add: `http://localhost:5173/verify-otp`

### Email Confirmation Settings
- **Enable email confirmations**: Turn this ON
- **Secure email change**: Turn this ON
- **Double confirm changes**: Turn this ON (recommended)

### OTP Settings
- **Enable OTP**: Turn this ON
- **OTP Expiry**: Set to 3600 seconds (1 hour) or your preferred duration
- **OTP Length**: Set to 6 digits

## 6. Configure Email Provider (Optional but Recommended)

1. Go to Authentication → Settings → SMTP
2. Configure your SMTP provider:
   - **Host**: Your SMTP host (e.g., smtp.gmail.com)
   - **Port**: Your SMTP port (usually 587 or 465)
   - **User**: Your email address
   - **Pass**: Your email password or app password
   - **Sender Name**: Your clinic name
   - **Sender Email**: Your verified email address

### Popular SMTP Providers:
- **Gmail**: Use App Password (not regular password)
- **SendGrid**: Use API key
- **Mailgun**: Use API key
- **Amazon SES**: Use AWS credentials

## 7. Test the Registration Flow

1. Start your development server: `npm run dev`
2. Navigate to `/register`
3. Fill out the registration form
4. You'll be redirected to `/verify-otp`
5. Check your email for the 6-digit OTP
6. Enter the OTP in the verification page
7. After successful verification, you'll be redirected to `/login`
8. Log in with your credentials

## 8. Customize Email Templates

1. Go to Authentication → Templates
2. Customize the following templates:

### Confirm Signup Template
```html
<h2>স্বাস্থ্যসেবা ক্লিনিক - ইমেইল নিশ্চিতকরণ</h2>
<p>আপনার অ্যাকাউন্ট নিশ্চিত করতে নিচের OTP কোডটি ব্যবহার করুন:</p>
<h1 style="font-size: 32px; letter-spacing: 8px; text-align: center; color: #059669;">{{ .Token }}</h1>
<p>এই কোডটি ১ ঘন্টা পর্যন্ত বৈধ থাকবে।</p>
<p>যদি আপনি এই অ্যাকাউন্ট তৈরি না করে থাকেন, তাহলে এই ইমেইলটি উপেক্ষা করুন।</p>
```

### Magic Link Template
```html
<h2>স্বাস্থ্যসেবা ক্লিনিক - লগইন লিংক</h2>
<p>আপনার অ্যাকাউন্টে লগইন করতে নিচের লিংকটি ক্লিক করুন:</p>
<a href="{{ .ConfirmationURL }}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">লগইন করুন</a>
<p>এই লিংকটি ১ ঘন্টা পর্যন্ত বৈধ থাকবে।</p>
```

## 9. Additional Configuration (Optional)

### Social Authentication
- Go to Authentication → Providers
- Enable and configure providers like Google, GitHub, etc.

### Custom Claims
- You can add custom claims to users for role-based access
- Modify the `handle_new_user()` function in the SQL script

### Rate Limiting
- Configure rate limiting for OTP requests
- Go to Authentication → Settings → Rate Limiting

## 10. Production Deployment

When deploying to production:

1. Update environment variables with production Supabase project
2. Add production URLs to Supabase settings
3. Configure custom domain if needed
4. Set up proper CORS policies
5. Configure production email provider
6. Test the complete flow in production

## 11. Security Best Practices

1. **Enable Row Level Security (RLS)** on all tables
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** for OTP requests
4. **Use HTTPS** in production
5. **Regular security audits** of your authentication flow
6. **Monitor authentication logs** for suspicious activity

## Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Make sure your `.env` file is in the project root
   - Restart your development server after adding environment variables

2. **CORS errors**
   - Add your domain to Supabase CORS settings
   - Check that your site URL is correctly configured

3. **Email not sending**
   - Check Supabase email settings
   - Verify your SMTP configuration
   - Check spam folder
   - Verify sender email is confirmed

4. **OTP not working**
   - Check OTP settings in Authentication → Settings
   - Verify email templates are configured
   - Check OTP expiry time

5. **Database errors**
   - Ensure the SQL schema has been executed
   - Check Row Level Security policies
   - Verify table structure

6. **User profile not created**
   - Check the trigger function in the database
   - Verify user metadata is being passed correctly
   - Check RLS policies for user_profiles table

### Debug Mode

To enable debug mode for authentication:

1. Go to Authentication → Settings → Advanced
2. Enable "Enable debug mode"
3. Check the logs in Authentication → Logs

### Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
- [Authentication Guide](https://supabase.com/docs/guides/auth) 