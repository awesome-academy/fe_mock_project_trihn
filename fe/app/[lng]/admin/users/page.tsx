import UsersContainer from '@/app/container/UsersContainer';

export default function UsersPage({ params: { lng } }: App.LanguageProps) {
  return <UsersContainer lng={lng} />;
}
