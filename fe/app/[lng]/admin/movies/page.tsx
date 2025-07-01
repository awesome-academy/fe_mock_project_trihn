import MoviesContainer from '@/app/container/MoviesContainer';

export default function MoviesPage({ params: { lng } }: App.LanguageProps) {
  return <MoviesContainer lng={lng} />;
}
