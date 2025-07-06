import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Card, CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { User, Mail, Phone, Calendar, Edit, Save, X } from 'lucide-react';

interface UserProfileData {
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  created_at: string;
}

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: '',
    gender: '',
    age: '',
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setError('প্রোফাইল লোড করতে সমস্যা হয়েছে');
      } else {
        setProfile(data);
        setEditForm({
          full_name: data.full_name || '',
          phone: data.phone || '',
          gender: data.gender || '',
          age: data.age?.toString() || '',
        });
      }
    } catch (err) {
      console.error('Error:', err);
      setError('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: editForm.full_name,
          phone: editForm.phone,
          gender: editForm.gender,
          age: parseInt(editForm.age),
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        setError('প্রোফাইল আপডেট করতে সমস্যা হয়েছে');
      } else {
        setSuccess('প্রোফাইল সফলভাবে আপডেট হয়েছে');
        setEditing(false);
        fetchUserProfile(); // Refresh the profile data
      }
    } catch (err) {
      setError('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError('');
    setSuccess('');
    // Reset form to original values
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
        age: profile.age?.toString() || '',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">প্রোফাইল পাওয়া যায়নি</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">ব্যবহারকারী প্রোফাইল</h1>
              {!editing && (
                <Button
                  onClick={() => setEditing(true)}
                  icon={<Edit className="h-4 w-4" />}
                  variant="outline"
                >
                  সম্পাদনা করুন
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <User className="inline-block mr-1 h-4 w-4" />
                    পূর্ণ নাম
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={saving}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.full_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Mail className="inline-block mr-1 h-4 w-4" />
                    ইমেইল
                  </label>
                  <p className="text-gray-900">{profile.email}</p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Phone className="inline-block mr-1 h-4 w-4" />
                    মোবাইল নাম্বার
                  </label>
                  {editing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={saving}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    জেন্ডার
                  </label>
                  {editing ? (
                    <select
                      value={editForm.gender}
                      onChange={(e) => setEditForm(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={saving}
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="male">পুরুষ</option>
                      <option value="female">মহিলা</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">
                      {profile.gender === 'male' ? 'পুরুষ' : 
                       profile.gender === 'female' ? 'মহিলা' : 
                       profile.gender === 'other' ? 'অন্যান্য' : 'নির্দিষ্ট নয়'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    বয়স
                  </label>
                  {editing ? (
                    <input
                      type="number"
                      value={editForm.age}
                      onChange={(e) => setEditForm(prev => ({ ...prev, age: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="1"
                      max="120"
                      disabled={saving}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.age} বছর</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Calendar className="inline-block mr-1 h-4 w-4" />
                    অ্যাকাউন্ট তৈরি হয়েছে
                  </label>
                  <p className="text-gray-900">
                    {new Date(profile.created_at).toLocaleDateString('bn-BD')}
                  </p>
                </div>
              </div>

              {editing && (
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    icon={<X className="h-4 w-4" />}
                    disabled={saving}
                  >
                    বাতিল করুন
                  </Button>
                  <Button
                    onClick={handleSave}
                    icon={<Save className="h-4 w-4" />}
                    disabled={saving}
                  >
                    {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile; 