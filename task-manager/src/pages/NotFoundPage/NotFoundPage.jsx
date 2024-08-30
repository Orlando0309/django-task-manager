import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="mt-4 text-lg text-muted-foreground">Oops! The page you are looking for does not exist.</p>
            <p className="mt-2 text-muted-foreground">It might have been removed, or the URL might be incorrect.</p>
            <Link to="/" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-lg">Go Back Home</Link>
        </div>
    )
}
export default NotFoundPage