export interface DriverRegisterForm {
  firstName?: string;
  lastName?: string;
  selectedTypeId?: string;
  identification?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
}


export interface OIDriverResponseByUid {
	data:     OIDriverByUid;
	isArray:  boolean;
	path:     string;
	duration: string;
	method:   string;
}

export interface OIDriverByUid {
	id:           number;
	created_date: Date;
	updated_date: Date;
	delete_date:  null;
	email:        string;
	uid_firebase: string;
	last_login:   null;
	state:        boolean;
	email_verify: boolean;
	roles:        Role[];
	delivery:     null;
}


export interface OIDriverById {
	data:     DriverByID;
	isArray:  boolean;
	path:     string;
	duration: string;
	method:   string;
}

export interface DriverByID {
	id:           number;
	created_date: Date;
	updated_date: Date;
	delete_date:  null;
	email:        string;
	uid_firebase: string;
	last_login:   null;
	state:        boolean;
	email_verify: boolean;
	delivery:     null;
	roles:        Role[];
	driver:       Driver;
}

export interface Driver {
	id:             number;
	created_date:   Date;
	updated_date:   Date;
	delete_date:    null;
	identification: string;
	name:           string;
	lastName:       string;
	phone:          string;
	imageUrl:       string;
}

export interface Role {
	id:           number;
	created_date: Date;
	updated_date: Date;
	delete_date:  null;
	name:         string;
	description:  string;
}

export interface OIDriversResponse {
	data:     Driver[];
	isArray:  boolean;
	path:     string;
	duration: string;
	method:   string;
}

export interface Driver {
	id:           number;
	created_date: Date;
	updated_date: Date;
	delete_date:  null;
	email:        string;
	uid_firebase: string;
	last_login:   null;
	state:        boolean;
	email_verify: boolean;
	roles:        Role[];
	driver:       Driver;
}

export interface Driver {
	id:             number;
	created_date:   Date;
	updated_date:   Date;
	delete_date:    null;
	identification: string;
	name:           string;
	lastName:       string;
	phone:          string;
	imageUrl:       string;
}

  