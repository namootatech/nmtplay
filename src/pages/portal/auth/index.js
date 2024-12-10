'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PhoneAuthProvider, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/util/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import {
  loga_inWithGoogle,
  loga_inWithFacebook,
  loga_in,
  registerishaWithEmail,
  registerishaWithGoogle,
  registerishaWithFacebook,
} from '@/util/auth/auth';

export default function LoginPage() {
  const [ncukaca, bekaIIncukaca] = useState('');
  const [cellNamba, setCellNamba] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isimo, setisimo] = useState('uku loga'); // New state for auth mode
  const router = useRouter();

  const handleEmailSignIn = async (e) => {
    console.log('handling email sign in');
    e.preventDefault();
    setIsLoading(true);
    console.log('ncukaca', ncukaca);
    try {
      await loga_in(ncukaca.nomyayi, ncukaca.password);
      router.push('/portal/files');
    } catch (error) {
      console.log('failed to sign in', error.code);
      if (error.code === 'auth/user-not-found') {
        setError('Akekho umntu oregisterishe ngale email kule website');
      } else if (error.code === 'auth/wrong-password') {
        setError('iWrongo ipassword yakho');
      } else {
        setError('Asikwazanga uku loga in.');
      }
    }
    setIsLoading(false);
  };

  const handleEmailregisterisha = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('handling email regisrtration', ncukaca);
    try {
      await registerishaWithEmail(ncukaca);
      router.push('/portal/files');
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Ikhona enye iuser enale email');
      } else {
        setError('Asikwazanga ukuyi creata i account yalkho');
      }
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await loga_inWithGoogle();
      router.push('/portal/files');
    } catch (error) {
      setError('Asikwazanaga uku loga in ngo google.');
    }
    setIsLoading(false);
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    try {
      await loga_inWithFacebook();
      router.push('/portal/files');
    } catch (error) {
      setError('Asikwazanga uku loga in ngo facebook');
    }
    setIsLoading(false);
  };

  const handlePhoneSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const provider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await signInWithPhoneNumber(auth, cellNamba);
      setVerificationCode(verificationId);
    } catch (error) {
      setError('Asikwazanga uythumela iverification code');
    }
    setIsLoading(false);
  };

  console.log('ncukaca', ncukaca);
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <Card className='w-[350px] bg-gray-800 text-white'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center text-fuchsia-500'>
            Loga in mGutyuli!
          </CardTitle>
          <CardDescription className='text-center text-gray-400'>
            Loga in okanye bhalisa iaccount tshomam
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* New Tabs for Login/Register */}
          <Tabs defaultValue='uku loga' className='w-full mb-4'>
            <TabsList className='grid w-full grid-cols-2 bg-gray-700'>
              <TabsTrigger
                value='uku loga'
                className='text-white data-[state=active]:bg-fuchsia-500'
                onClick={() => setisimo('uku loga')}
              >
                <span className='text-white'>Loga in</span>
              </TabsTrigger>
              <TabsTrigger
                value='register'
                className='text-white data-[state=active]:bg-fuchsia-500 active:text-white data[state=active]:text-foreground-white'
                onClick={() => setisimo('register')}
              >
                <span className='text-white'>Bhalisa</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {isimo === 'uku loga' ? (
            <Tabs defaultValue='nomyayi' className='w-full'>
              <TabsList className='grid w-full grid-cols-3 bg-gray-700'>
                <TabsTrigger
                  value='nomyayi'
                  className='text-white data-[state=active]:bg-fuchsia-500'
                >
                  <span className='text-white'>NgeEmail</span>
                </TabsTrigger>
                <TabsTrigger
                  value='phone'
                  className='text-white data-[state=active]:bg-fuchsia-500'
                >
                  <span className='text-white'>ngePhone</span>
                </TabsTrigger>
                <TabsTrigger
                  value='social'
                  className='text-white data-[state=active]:bg-fuchsia-500'
                >
                  <span className='text-white'>Social Media</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value='nomyayi'>
                <form onSubmit={handleEmailSignIn}>
                  <div className='grid gap-2'>
                    <Label htmlFor='nomyayi' className='text-white'>
                      iEmail address yakho
                    </Label>
                    <Input
                      id='nomyayi'
                      type='nomyayi'
                      placeholder='othile@gmail.com'
                      value={ncukaca.nomyayi}
                      onChange={(e) =>
                        bekaIIncukaca({ ...ncukaca, nomyayi: e.target.value })
                      }
                      className='bg-gray-700 text-white'
                    />
                    <Label htmlFor='password' className='text-white'>
                      iPassword yakho
                    </Label>
                    <div className='relative'>
                      <Input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        value={ncukaca.password}
                        onChange={(e) =>
                          bekaIIncukaca({
                            ...ncukaca,
                            password: e.target.value,
                          })
                        }
                        className='bg-gray-700 text-white'
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                      >
                        {showPassword ? (
                          <Icons.eyeSlash className='h-5 w-5 text-gray-400' />
                        ) : (
                          <Icons.eye className='h-5 w-5 text-gray-400' />
                        )}
                      </span>
                    </div>
                    <Button
                      type='submit'
                      className='w-full mt-4 bg-fuchsia-500 hover:bg-fuchsia-600'
                      onClick={handleEmailSignIn}
                    >
                      {isLoading ? (
                        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                      ) : (
                        'Ngena'
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value='phone'>
                <form onSubmit={handlePhoneSignIn}>
                  <div className='grid gap-2'>
                    <Label htmlFor='phone' className='text-white'>
                      iPhone Number yakho
                    </Label>
                    <Input
                      id='phone'
                      type='tel'
                      placeholder='+1 (555) 000-0000'
                      value={cellNamba}
                      onChange={(e) => setCellNamba(e.target.value)}
                      className='bg-gray-700 text-white'
                    />
                    <Button
                      type='submit'
                      className='w-full mt-4 bg-fuchsia-500 hover:bg-fuchsia-600'
                      onClick={handlePhoneSignIn}
                    >
                      {isLoading ? (
                        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                      ) : (
                        'Send Code'
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value='social'>
                <div className='grid gap-2'>
                  <Button
                    onClick={handleGoogleSignIn}
                    variant='outline'
                    className='w-full bg-gray-700 text-white hover:bg-gray-600'
                  >
                    <Icons.google className='mr-2 h-4 w-4' /> Loga in ngo Google
                  </Button>
                  <Button
                    onClick={handleFacebookSignIn}
                    variant='outline'
                    className='w-full bg-gray-700 text-white hover:bg-gray-600'
                  >
                    <Icons.facebook className='mr-2 h-4 w-4' /> Loga in ngo
                    Facebook
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <form onSubmit={handleEmailregisterisha}>
              <div className='grid gap-2'>
                <Label htmlFor='nomyayi' className='text-white'>
                  iGama Lakho
                </Label>
                <Input
                  id='igama'
                  type='text'
                  placeholder='e.g doctorX'
                  value={ncukaca.gama}
                  onChange={(e) =>
                    bekaIIncukaca({ ...ncukaca, gama: e.target.value })
                  }
                  className='bg-gray-700 text-white'
                />
                <Label htmlFor='nomyayi' className='text-white'>
                  Email address yakho
                </Label>
                <Input
                  id='nomyayi'
                  type='nomyayi'
                  placeholder='othile@gmail.com'
                  value={ncukaca.nomyayi}
                  onChange={(e) =>
                    bekaIIncukaca({ ...ncukaca, nomyayi: e.target.value })
                  }
                  className='bg-gray-700 text-white'
                />
                <Label htmlFor='password' className='text-white'>
                  Password yakho
                </Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={ncukaca.password}
                    onChange={(e) =>
                      bekaIIncukaca({ ...ncukaca, password: e.target.value })
                    }
                    className='bg-gray-700 text-white'
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                  >
                    {showPassword ? (
                      <Icons.eyeSlash className='h-5 w-5 text-gray-400' />
                    ) : (
                      <Icons.eye className='h-5 w-5 text-gray-400' />
                    )}
                  </span>
                </div>
                <Button
                  type='submit'
                  className='w-full mt-4 bg-fuchsia-500 hover:bg-fuchsia-600'
                  onClick={handleEmailregisterisha}
                >
                  {isLoading ? (
                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    'Bhalisa'
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          {error && <p className='text-red-500 text-center'>{error}</p>}
          <p className='text-center text-sm text-gray-400'>
            Ngoku loga in kwakho uyavumelana ne{' '}
            <a href='#' className='underline text-fuchsia-500'>
              Migaqo siseko
            </a>{' '}
            yethu kunye{' '}
            <a href='#' className='underline text-fuchsia-500'>
              nemimiselo yethu yokubaluleka kwe mfihlo yobumi
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
