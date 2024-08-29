'use client';

import { useTranslations } from 'next-intl';
import { Bebas_Neue } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  rememberMe: z.boolean(),
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

export default function LoginForm() {
  const t = useTranslations('login');
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'demimo',
      password: 'K3oCs97e',
      rememberMe: true,
    },
  });

  const router = useRouter();

  async function onSubmit(values: FormValues) {
    router.push('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px]">
        <div>
          <h1 className={`text-8xl -mb-4 ${bebasNeue.className}`}>Glider</h1>
          <p className="text-muted-foreground pl-1">{t('withYouFurther')}</p>
        </div>
        <div className="space-y-4 mt-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">{t('username')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('username')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">{t('password')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={t('password')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 pl-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="ml-2 text-muted-foreground">
                  {t('rememberMe')}
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-8">
          {t('submit')}
        </Button>
      </form>
    </Form>
  );
}
