import AppRoutes from './routes/AppRoutes'
import useSocket from "./hooks/useSocket";


export default function App() {
    // You can pass the logged-in user's ID here if available
    useSocket("user1");

    return <AppRoutes />
}
