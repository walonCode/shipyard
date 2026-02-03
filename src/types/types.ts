export interface Result<T> {
	success: boolean;
	error?: string;
	data?: T;
}
