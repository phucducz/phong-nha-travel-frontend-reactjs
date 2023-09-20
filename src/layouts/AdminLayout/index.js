import Header from "./Header";

function AdminLayout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default AdminLayout;