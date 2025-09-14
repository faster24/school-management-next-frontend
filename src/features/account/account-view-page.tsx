'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Shield, Edit3, Save, X } from 'lucide-react';
import { Role } from '@/types/school-index';
import { updateUserPassword } from '@/services/user.services';

type TUser = {
  id: number;
  name: string;
  email: string;
  roles: Role[];
  image_url: string | null;
};

export default function AccountViewPage({ user }: { user: TUser }) {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = async () => {
    try {
      const isSuccess = await updateUserPassword({
        passwordData,
        id: user.id
      });
      if (isSuccess) {
        setPasswordData({
          newPassword: '',
          confirmPassword: ''
        });
        setIsChangingPassword(false);
      }
    } catch (error) {
      console.log('error', error);
    }
    setPasswordData({
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangingPassword(false);
  };

  const handleCancelPasswordChange = () => {
    setPasswordData({
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangingPassword(false);
  };

  return (
    <div className='container mx-auto space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Account Settings</h1>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Avatar Section */}
            <div className='flex items-center space-x-4'>
              <Avatar className='h-20 w-20'>
                <AvatarImage src={user.image_url || ''} alt={user.name} />
                <AvatarFallback className='text-lg'>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className='text-lg font-semibold'>{user.name}</h3>
                <p className='text-muted-foreground text-sm'>
                  {user.roles[0].name}
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Full Name</Label>
                <div className='bg-muted/50 flex items-center gap-2 rounded-md border p-3'>
                  <User className='text-muted-foreground h-4 w-4' />
                  <span>{user.name}</span>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <div className='bg-muted/50 flex items-center gap-2 rounded-md border p-3'>
                  <Mail className='text-muted-foreground h-4 w-4' />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className='space-y-2'>
                <Label>Role</Label>
                <div className='bg-muted/50 flex items-center gap-2 rounded-md border p-3'>
                  <Shield className='text-muted-foreground h-4 w-4' />
                  <span>{user.roles[0].name}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Update Card */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='h-5 w-5' />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <p className='text-muted-foreground text-sm'>
                Update your password to keep your account secure. Make sure to
                use a strong password.
              </p>

              {isChangingPassword ? (
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='newPassword'>New Password</Label>
                    <Input
                      id='newPassword'
                      name='newPassword'
                      type='password'
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder='Enter new password'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='confirmPassword'>
                      Confirm New Password
                    </Label>
                    <Input
                      id='confirmPassword'
                      name='confirmPassword'
                      type='password'
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder='Confirm new password'
                    />
                  </div>

                  <div className='flex gap-2'>
                    <Button
                      onClick={handleUpdatePassword}
                      className='flex items-center gap-2'
                    >
                      <Save className='h-4 w-4' />
                      Update Password
                    </Button>
                    <Button
                      variant='outline'
                      onClick={handleCancelPasswordChange}
                      className='flex items-center gap-2'
                    >
                      <X className='h-4 w-4' />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  <Button
                    onClick={() => setIsChangingPassword(true)}
                    variant='outline'
                    className='flex items-center gap-2'
                  >
                    <Edit3 className='h-4 w-4' />
                    Change Password
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
