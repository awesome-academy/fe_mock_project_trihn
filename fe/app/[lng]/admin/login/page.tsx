import dynamic from 'next/dynamic';
import Spin from '@/app/components/Spin';

const AdminLoginContainer = dynamic(
  () => import('@/app/container/AdminLoginContainer'),
  {
    loading: () => <Spin />,
    ssr: false,
  },
);

export default function LoginPage({ params: { lng } }: App.LanguageProps) {
  return <AdminLoginContainer lng={lng} />;
}
