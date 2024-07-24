export interface RestaurantsResponse {
	data: SingleRestaurantResponse[];
	isArray: boolean;
	path: string;
	duration: string;
	method: string;
}

export interface SingleRestaurantResponse {
	id: number;
	created_date: Date;
	updated_date: Date;
	delete_date: null;
	nit: string;
	name: string;
	address: string;
	phone: string;
	description: string;
	attachments: Attachment[];
}

export interface Attachment {
	id: number;
	created_date: Date;
	updated_date: Date;
	delete_date: null;
	image_url: string;
	description: string;
}

export interface SimpleRestaurant {
	id: string;
	name: string;
	address: string;
}

export interface ICreateRestaurante {
	nit: string;
	name: string;
	address: string;
	phone: string;
	description: string;
	attachments: AttachmentToCreate[];
}

export interface AttachmentToCreate {
	image_url: string;
	description: string;
}

export interface ProductRestaurant {
	id:           number;
	created_date: Date;
	updated_date: Date;
	delete_date:  null;
	name:         string;
	description:  string;
	priceUnitary: string;
	discount:     string;
	category:     string;
	state:        boolean;
	imageUrl:     string;
	extras:       any[];
	restaurant:   Restaurant;
}

export interface Restaurant {
	id:           number;
	created_date: Date;
	updated_date: Date;
	delete_date:  null;
	nit:          string;
	name:         string;
	address:      string;
	phone:        string;
	description:  string;
}
