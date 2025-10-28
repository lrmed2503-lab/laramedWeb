"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCategories } from '@/lib/getQueries';
import { urlFor } from '@/sanity/lib/client'; // Asegúrate de tener esto configurado

// Links estáticos que no dependen de las categorías
const staticLinks = [
  {
    name: 'Inicio',
    href: '/'
  },
  {
    name: 'Sobre Nosotros',
    href: '/sobre-nosotros'
  },
  {
    name: 'Noticias',
    href: '/noticias'
  },
  {
    name: 'Contactos',
    href: '/contactos'
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState([]);
  const [links, setLinks] = useState([]);
  const pathname = usePathname();

  // Cargar categorías desde Sanity
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        // Tu función devuelve {categories}, así que accedemos a data.categories
        const categoriesData = data.categories || [];
        setCategories(categoriesData);
        
        // Construir los links combinando los estáticos con las categorías dinámicas
        const dynamicLinks = [
          ...staticLinks.slice(0, 2), // Inicio y Sobre Nosotros
          {
            name: 'Productos',
            href: '/productos',
            submenu: categoriesData.map(categoria => ({
              name: categoria.nombre, // Usamos 'nombre' de tu schema
              href: `/categorias/${categoria.slug}`, // Ajusta la ruta según necesites
              image: categoria.imagen ? urlFor(categoria.imagen).url() : '/logo2.jpg'
            }))
          },
          ...staticLinks.slice(2) // Noticias y Contactos
        ];
        
        setLinks(dynamicLinks);
      } catch (error) {
        console.error('Error cargando categorías:', error);
        // En caso de error, usar links por defecto
        setLinks([
          ...staticLinks.slice(0, 2),
          {
            name: 'Productos',
            href: '/productos',
            submenu: [
              {
                name: 'Todos los Productos',
                href: '/productos',
                image: '/logo2.jpg'
              }
            ]
          },
          ...staticLinks.slice(2)
        ]);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProductsHover = (open) => {
    if (!isMobile) {
      setIsProductsOpen(open);
    }
  };

  const handleProductsClick = () => {
    if (isMobile) {
      setIsProductsOpen(!isProductsOpen);
    }
  };

  // Si no hay links cargados aún, mostrar un header básico
  if (links.length === 0) {
    return (
      <header className="sticky w-full bg-white shadow-md z-50 h-[80px] p-3 top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/"><img src='/logo.png' className='relative z-50 h-12' alt="Logo" /></Link>
          <div className="hidden md:block">
            <span className="text-gray-500">Cargando...</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky w-full bg-white shadow-md z-50 h-[80px] p-3 top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/"><img src='/logo.png' className='relative z-50 h-12' alt="Logo" /></Link>
        <button 
          className="md:hidden p-2 text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <nav className="hidden md:block relative h-full">
          <ul className="flex justify-around items-center gap-8 h-full">
            {links.map((link, index) => {
              const isActive = link.href === pathname || 
                (link.submenu && link.href === '/productos' && 
                 (pathname.startsWith('/productos') || pathname.startsWith('/categorias')));
              
              return (
                <li 
                  key={index} 
                  className='relative group h-[67px] duration-100 flex items-center justify-center'
                  onMouseEnter={() => link.submenu && handleProductsHover(true)}
                  onMouseLeave={() => link.submenu && handleProductsHover(false)}
                >
                  {link.submenu ? (
                    <>
                      <Link href='/productos'
                        className={`flex items-center ${isActive ? 'rounded-full bg-[#64b9c0] text-white py-2 px-3 font-bold' : 'hover:text-blue-700'}`}
                        onClick={handleProductsClick}
                      >
                        {link.name}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                      
                      {isProductsOpen && link.submenu.length > 0 && (
                        <div className="fixed left-0 top-[60px] w-screen bg-white shadow-xl py-6 z-40 mt-2 border-t border-gray-200">
                          <div className="container mx-auto">
                            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(link.submenu.length, 5)} gap-6`}>
                              {link.submenu.map((item, idx) => (
                                <Link key={idx} href={item.href} onClick={() => setIsProductsOpen(false)}>
                                  <div className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full mb-3 overflow-hidden flex items-center justify-center">
                                      {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800 text-xs">
                                          <span>Imagen</span>
                                        </div>
                                      )}
                                    </div>
                                    <span className="text-sm font-medium text-center text-gray-700">{item.name}</span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={link.href} className={`flex items-center ${isActive ? ' rounded-full bg-[#64b9c0] text-white py-2 px-3 font-bold' : 'hover:text-blue-700'}`}>
                      {link.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2">
          <ul className="py-4">
            {links.map((link, index) => (
              <li key={index} className="border-b border-gray-200 last:border-b-0">
                {link.submenu ? (
                  <>
                    <button 
                      className="w-full px-4 py-3 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50"
                      onClick={handleProductsClick}
                    >
                      <span className="font-medium">{link.name}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isProductsOpen && (
                      <div className="bg-gray-50 px-4 py-3">
                        <div className="grid grid-cols-2 gap-3">
                          {link.submenu.map((item, idx) => (
                            <Link key={idx} href={item.href} onClick={() => {
                              setIsMenuOpen(false);
                              setIsProductsOpen(false);
                            }}>
                              <div className="flex flex-col items-center p-2 rounded hover:bg-gray-200 transition-colors duration-200">
                                <div className="w-12 h-12 bg-gray-200 rounded-full mb-1 overflow-hidden flex items-center justify-center">
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800 text-xs">
                                      <span>Img</span>
                                    </div>
                                  )}
                                </div>
                                <span className="text-xs font-medium text-center text-gray-700">{item.name}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link 
                    href={link.href} 
                    className="block px-4 py-3 hover:bg-gray-100 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
