export type Race = {
  distance: number;
  duration: number;
};

export interface RaceData {
  longitud: string;
}
[];

export interface RequestDriver {
  coordinates: [
    {latitud: number; longitud: number; type: 'origen'},
    {latitud: number; longitud: number; type: 'destino'},
  ];
  id: string;
  id_client: string;
  id_driver: string;
}
