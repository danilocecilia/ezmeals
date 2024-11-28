'use client';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentSession } from '@hooks/useCurrentSession';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { signInWithCreds, signInWithGoogle } from '../actions';

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'This field has to be filled.'
    })
    .email('This is not a valid email')
    .max(300, {
      message: "Password can't be longer than 300 characters."
    }),
  password: z
    .string()
    .min(6, { message: 'Password has to be at least 6 characters long.' })
});

const LoginForm = () => {
  const { session } = useCurrentSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await signInWithCreds(values.email, values.password);

    // @ts-expect-error - update is not defined on session
    session?.update();

    if (response?.error) {
      toast.error('Error', {
        description: 'Invalid credentials, please try again'
      });
      return;
    }

    if (!response?.error) {
      router.push('/');
    }

    toast.success('You are now signed in!');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[390px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="johndoe@whatever.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                              href="/forgot-password"
                              className="ml-auto inline-block text-sm underline"
                            >
                              Forgot your password?
                            </Link>
                          </div>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    await signInWithGoogle();
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden lg:block self-center">
            <Image
              src="/logo.png"
              alt="Image"
              priority={true}
              width={500} // Required, but sets the aspect ratio
              height={500} // Will adjust automatically based on width
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
