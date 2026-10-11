import React, { useMemo, useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, ArrowRight, Star, Plus, Minus, X, Check } from 'lucide-react';

const products = [
  {id:1,name:'Everyday Sneakers',category:'Footwear',price:2499,old:3299,rating:4.8,color:'#e8dfd3',emoji:'👟',tag:'BESTSELLER'},
  {id:2,name:'Minimal Backpack',category:'Accessories',price:1899,old:2399,rating:4.7,color:'#d7e2d5',emoji:'🎒',tag:'NEW'},
  {id:3,name:'Classic Headphones',category:'Electronics',price:3299,old:3999,rating:4.9,color:'#dce3f0',emoji:'🎧',tag:'POPULAR'},
  {id:4,name:'Ceramic Coffee Set',category:'Home',price:999,old:1299,rating:4.6,color:'#f0dfd2',emoji:'☕',tag:''},
  {id:5,name:'Everyday Watch',category:'Accessories',price:2799,old:3499,rating:4.8,color:'#e4dfed',emoji:'⌚',tag:''},
  {id:6,name:'Desk Lamp',category:'Home',price:1499,old:1899,rating:4.5,color:'#e9e5d7',emoji:'💡',tag:'SALE'},
  {id:7,name:'Wireless Speaker',category:'Electronics',price:2199,old:2799,rating:4.7,color:'#d8e5e8',emoji:'🔊',tag:''},
  {id:8,name:'Canvas Tote',category:'Accessories',price:699,old:899,rating:4.6,color:'#e7dfd3',emoji:'👜',tag:''}
];
const money = n => '₹' + n.toLocaleString('en-IN');
export default function App(){
  const [query,setQuery]=useState(''); const [category,setCategory]=useState('All');
  const [cart,setCart]=useState({}); const [liked,setLiked]=useState([]); const [cartOpen,setCartOpen]=useState(false); const [notice,setNotice]=useState('');
  const categories=['All','Footwear','Accessories','Electronics','Home'];
  const shown=useMemo(()=>products.filter(p=>(category==='All'||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase())),[category,query]);
  const count=Object.values(cart).reduce((a,b)=>a+b,0);
  const total=products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0);
  const add=id=>{setCart(c=>({...c,[id]:(c[id]||0)+1}));setNotice('Added to your bag');setTimeout(()=>setNotice(''),1800)};
  const qty=(id,delta)=>setCart(c=>{const next={...c,[id]:Math.max(0,(c[id]||0)+delta)};if(!next[id])delete next[id];return next});
  return <div className="app">
    <div className="topline">A little something for your everyday <span>— Free delivery over ₹1,999</span></div>
    <header className="nav wrap"><a className="brand" href="#"><span className="brand-mark">S</span> shopease<span className="dot">.</span></a>
      <nav>{categories.slice(1).map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'nav-active':''}>{c}</button>)}</nav>
      <div className="nav-actions"><label className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products"/></label><button className="icon-btn" aria-label="Open cart" onClick={()=>setCartOpen(true)}><ShoppingBag size={20}/><b>{count}</b></button><button className="menu-btn" aria-label="Menu"><Menu/></button></div>
    </header>
    <main>
      <section className="hero wrap"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot"></span> THOUGHTFULLY PICKED FOR YOU</span><h1>Good things.<br/><em>Everyday.</em></h1><p>Discover useful, well-designed essentials that make ordinary moments feel a little more special.</p><button className="primary" onClick={()=>{setCategory('All');document.getElementById('products').scrollIntoView({behavior:'smooth'})}}>Explore collection <ArrowRight size={17}/></button><div className="hero-proof"><div className="avatars"><span>☺</span><span>✦</span><span>♡</span></div><div><b>4.8/5 average rating</b><small>Loved by everyday people</small></div></div></div>
        <div className="hero-art"><div className="sun"></div><div className="art-label label-one">DESIGNED FOR DAILY LIFE</div><div className="big-object">✦</div><div className="art-product product-a">👟</div><div className="art-product product-b">🎧</div><div className="art-product product-c">☕</div><div className="art-card"><span>THE DAILY EDIT</span><b>Small upgrades,<br/>big difference.</b><ArrowRight size={17}/></div><div className="art-label label-two">EST. FOR YOUR ROUTINE</div></div>
      </section>
      <section className="benefits wrap"><div><span>✳</span><b>Thoughtful picks</b><small>Useful, not excessive</small></div><div><span>↗</span><b>Easy returns</b><small>30-day return window</small></div><div><span>♡</span><b>Made to last</b><small>Quality over quantity</small></div><div><span>⌁</span><b>Secure checkout</b><small>Shop with confidence</small></div></section>
      <section className="products-section wrap" id="products"><div className="section-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>Find your <em>favourite.</em></h2></div><p>Everyday essentials, picked with care.</p></div>
        <div className="filters">{categories.map(c=><button key={c} className={category===c?'filter active':'filter'} onClick={()=>setCategory(c)}>{c}</button>)}</div>
        {shown.length?<div className="grid">{shown.map(p=><article className="product-card" key={p.id}><div className="product-image" style={{background:p.color}}><span className="product-emoji">{p.emoji}</span>{p.tag&&<span className="tag">{p.tag}</span>}<button className={'heart '+(liked.includes(p.id)?'liked':'')} onClick={()=>setLiked(l=>l.includes(p.id)?l.filter(x=>x!==p.id):[...l,p.id])} aria-label="Save to wishlist"><Heart size={18} fill={liked.includes(p.id)?'currentColor':'none'}/></button></div><div className="product-info"><div className="product-meta"><span>{p.category}</span><span className="rating"><Star size={13} fill="currentColor"/>{p.rating}</span></div><h3>{p.name}</h3><div className="price-row"><b>{money(p.price)}</b><del>{money(p.old)}</del><button onClick={()=>add(p.id)} aria-label={'Add '+p.name+' to bag'}><Plus size={18}/></button></div></div></article>)}</div>:<div className="empty">No products found. Try another search.</div>}
      </section>
      <section className="newsletter wrap"><div><span className="eyebrow">A NOTE FROM US</span><h2>Good finds, <em>occasionally.</em></h2><p>Get new arrivals and thoughtful picks in your inbox.</p></div><form onSubmit={e=>{e.preventDefault();setNotice('Thanks for subscribing!');e.target.reset();setTimeout(()=>setNotice(''),2200)}}><input type="email" placeholder="Your email address" required/><button className="primary">Sign me up <ArrowRight size={16}/></button></form></section>
    </main>
    <footer className="footer"><div className="wrap footer-inner"><a className="brand" href="#"><span className="brand-mark">S</span> shopease<span className="dot">.</span></a><span>Everyday essentials, thoughtfully picked.</span><small>© 2026 ShopEase — Demo frontend project</small></div></footer>
    {notice&&<div className="toast"><Check size={17}/>{notice}</div>}
    {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-panel" onClick={e=>e.stopPropagation()}><div className="cart-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your bag ({count})</h2></div><button className="icon-btn" onClick={()=>setCartOpen(false)}><X/></button></div>{count===0?<div className="cart-empty">Your bag is waiting for something good.</div>:<div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-item" key={p.id}><div className="cart-thumb" style={{background:p.color}}>{p.emoji}</div><div className="cart-item-info"><b>{p.name}</b><span>{money(p.price)}</span><div className="qty"><button onClick={()=>qty(p.id,-1)}><Minus size={13}/></button><span>{cart[p.id]}</span><button onClick={()=>qty(p.id,1)}><Plus size={13}/></button></div></div></div>)}</div>}<div className="cart-bottom"><div><span>Subtotal</span><b>{money(total)}</b></div><small>Taxes and delivery calculated at checkout.</small><button className="primary full" onClick={()=>setNotice('Demo only — checkout is not connected to a payment service.')}>Continue to checkout <ArrowRight size={17}/></button></div></aside></div>}
  </div>;
}
