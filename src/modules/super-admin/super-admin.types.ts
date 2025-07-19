import { JwtPayload } from "jsonwebtoken"

export interface SuperAdminPayload extends JwtPayload {
    name: string
    role: string
}