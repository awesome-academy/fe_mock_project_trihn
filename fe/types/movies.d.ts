declare namespace Movies {
  type Movie = {
    id: number;
    createdAt: string;
    description: string;
    documentId: string;
    duration: number;
    genres: App.BaseData[];
    releaseYear: number;
    title: string;
    updatedAt: string;
    poster: Omit<BaseData, 'name'> & {
      url: string;
    };
  };

  type Movies = Movie[];
}
