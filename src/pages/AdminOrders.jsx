import AdminHeader from '../components/AdminHeader';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders');
                setOrders(data.orders || data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
            <AdminSidebar />
            <AdminHeader title="Order Management" />

            <main style={{ marginLeft: '260px', padding: '2rem 3rem' }}>
                <header style={{ marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#111' }}>Orders Management</h1>
                    <p style={{ color: '#666', marginTop: '5px' }}>Track and manage your customer orders.</p>
                </header>

                <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #EEE' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEE' }}>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px' }}>ORDER ID</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px' }}>CUSTOMER</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px' }}>TOTAL</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center' }}>Loading...</td></tr>
                            ) : (
                                orders.length > 0 ? orders.map((order) => (
                                    <tr key={order._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                        <td style={{ padding: '15px 20px', fontWeight: '800', fontSize: '12px' }}>#{order._id.slice(-6).toUpperCase()}</td>
                                        <td style={{ padding: '15px 20px' }}>{order.user?.name || 'Guest'}</td>
                                        <td style={{ padding: '15px 20px', fontWeight: '700' }}>BDT {order.totalPrice}</td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <Clock size={14} color="#F59E0B" />
                                                <span style={{ color: '#F59E0B', fontSize: '12px', fontWeight: '800' }}>PENDING</span>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>No orders found yet.</td></tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminOrders;
