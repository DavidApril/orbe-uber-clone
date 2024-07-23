export interface DriverRegisterForm {
  firstName: string;
  lastName: string;
  selectedTypeId?: string;
  identification: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
}

export interface DriverResponseByUid {
	data:     DriverResponseByUidData;
	isArray:  boolean;
	path:     string;
	duration: string;
	method:   string;
}

export interface DriverResponseByUidData {
	id:           number;
	created_date: Date;
	updated_date: Date;
	delete_date:  null;
	email:        string;
	uid_firebase: string;
	last_login:   null;
	state:        boolean;
	email_verify: boolean;
	roles:        any[];
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
