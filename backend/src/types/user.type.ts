type User = {
    id?: number,
    email: string,
    password: string,
    name: string,
    role: number,
    cart_id: number,
    created_at: Date
}
  
export default User