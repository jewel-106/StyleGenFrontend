import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api, { API_URL } from '../api/api';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Heart, ShieldCheck, Leaf } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'admin') {
            navigate('/admin');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data.products || data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const imageUtil = (path) => getImageUrl(path, API_URL);

    return (
        <div className="fade-in" style={{ background: '#FFF' }}>
            {/* HERO SECTION - ACCURATE FIGMA STYLE */}
            <section style={{
                height: '550px',
                background: '#111 url("https://www.transparenttextures.com/patterns/dark-matter.png")',
                overflow: 'hidden',
                display: 'flex',
                margin: '1.5rem 2rem',
                borderRadius: '4px'
            }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5%' }}>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ color: 'var(--primary)', fontWeight: '800', marginBottom: '1rem', fontSize: '14px' }}>ঈদ আয়োজনে</p>
                        <h1 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#FFF', lineHeight: '1', marginBottom: '1.5rem' }}>
                            স্টাইলে থাকুন<br />
                            <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                শুধুই <div style={{ border: '3px solid #FFF', padding: '5px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '20px', height: '20px', background: 'var(--primary)' }}></div>
                                    <span style={{ fontSize: '2.5rem', letterSpacing: '-2px' }}>StyleGen</span>
                                </div>
                            </span>
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '400px', fontSize: '14px', lineHeight: '1.6' }}>
                            Premium handcrafted leather goods for the modern professional. Quality and craftsmanship in every stitch.
                        </p>
                        <button className="btn btn-primary" style={{ marginTop: '2.5rem', padding: '15px 40px' }}>SHOP NOW</button>
                    </div>
                </div>

                <div style={{ flex: 1.2, display: 'flex', height: '100%' }}>
                    <div style={{ flex: 1, height: '100%', clipPath: 'polygon(25% 0, 100% 0, 75% 100%, 0% 100%)', transform: 'translateX(30px)' }}>
                        <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>
                    <div style={{ flex: 1, height: '100%', clipPath: 'polygon(25% 0, 100% 0, 75% 100%, 0% 100%)', transform: 'translateX(0px)', zIndex: 2 }}>
                        <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>
                    <div style={{ flex: 1, height: '100%', clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)', transform: 'translateX(-30px)' }}>
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>
                </div>
            </section>

            {/* CATEGORIES - FIGMA STYLE */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Shop by category</h2>
                        <Link to="/products" style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '800', textDecoration: 'none' }}>View All Categories →</Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                        {[
                            { name: 'Shoes', img: '/images/products/shoes.jpg' },
                            { name: 'Wallets', img: '/images/products/wallet.jpg' },
                            { name: 'Bags', img: '/images/products/bags.jpg' },
                            { name: 'Belt', img: '/images/products/belt.jpg' },
                            { name: 'T Shirts', img: '/images/products/loafers.jpg' }
                        ].map((cat) => (
                            <Link key={cat.name} to={`/products?category=${cat.name.toLowerCase()}`} style={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ height: '300px', background: '#F9FAFB', borderRadius: '2px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid #EEE' }}>
                                    <img src={cat.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={cat.name} />
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: '700', color: '#111' }}>{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED - 5 COLS FIGMA */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <h2 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>Featured Products</h2>
                        <div style={{ width: '40px', height: '2px', background: 'var(--primary)', margin: '15px auto' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                        {products.slice(0, 5).map((product) => (
                            <div key={product.id} className="card" style={{ background: '#FFF', border: '1px solid #F3F4F6', borderRadius: '4px' }}>
                                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                                    <img src={imageUtil(product.image)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#FF4D1C', color: 'white', padding: '3px 7px', fontSize: '10px', fontWeight: '900' }}>Save 20%</span>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h3 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '5px', height: '40px', overflow: 'hidden' }}>{product.name}</h3>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <span style={{ color: '#FF4D1C', fontWeight: '900', fontSize: '14px' }}>BDT {product.price}</span>
                                        <span style={{ color: '#AAA', fontSize: '11px', textDecoration: 'line-through', marginLeft: '8px' }}>BDT {product.price + 200}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <button style={{ padding: '8px', border: '1px solid #EEE', background: '#FFF', fontSize: '10px', fontWeight: '900', cursor: 'pointer' }}>ADD TO CART</button>
                                        <button className="btn-primary" style={{ padding: '8px', border: 'none', fontSize: '10px', fontWeight: '900', cursor: 'pointer' }}>BUY NOW</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CRAFTSMANSHIP - ACCURATE FIGMA LAYOUT */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '1.5rem' }}>
                        {/* Big Artisan Box */}
                        <div style={{ position: 'relative', height: '550px', background: '#000', borderRadius: '4px', overflow: 'hidden' }}>
                            <img src={imageUtil("https://images.unsplash.com/photo-1473188588955-719548761567?auto=format&fit=crop&w=1200")} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="" />
                            <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', color: '#FFF' }}>
                                <p style={{ fontSize: '12px', fontWeight: '700', marginBottom: '0.5rem' }}>Our Craftsmanship</p>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', width: '300px', lineHeight: '1.1' }}>Made by master artisans</h2>
                                <p style={{ fontSize: '13px', opacity: 0.7, maxWidth: '400px', marginBottom: '2rem' }}>Every piece is hand-stitched by master artisans with over 20 years of experience in traditional leatherwork.</p>
                                <button style={{ padding: '12px 30px', background: 'white', color: '#000', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer' }}>LEARN MORE</button>
                            </div>
                        </div>

                        {/* Right Stack */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{
                                flex: 1,
                                background: `url(${imageUtil("https://images.unsplash.com/photo-1617033935324-a23bc4c1e11b?auto=format&fit=crop&w=800")})`,
                                backgroundSize: 'cover',
                                borderRadius: '4px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', borderRadius: '4px' }}></div>
                                <span style={{ color: 'white', fontSize: '13px', fontWeight: '800', zIndex: 1, letterSpacing: '1px' }}>Ethical Sourcing</span>
                            </div>
                            <div style={{
                                flex: 1.2,
                                background: '#FF4D1C',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                padding: '2.5rem',
                                textAlign: 'center'
                            }}>
                                <ShieldCheck size={40} style={{ marginBottom: '1.2rem' }} />
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.8rem' }}>Lifetime Warranty</h3>
                                <p style={{ fontSize: '12px', opacity: 0.9, lineHeight: '1.6' }}>We stand by the quality of our products for a lifetime of use.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
