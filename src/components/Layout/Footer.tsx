import { FaWhatsapp, FaFacebook, FaTiktok } from 'react-icons/fa';

export default function Footer(){
  return(
    <div className="bg-[#15599a] py-5">
        <footer className="container mx-auto grid items-center md:grid-cols-3 text-white font-semibold place-items-center">
          <img src="/logob.png" className="w-[300px]" />
          <div>
            <h2 className="font-bold text-xl">INFORMACION</h2>
            <h3>
                Direccion: Miraflores, Av. Villalobos, Edif. Villalobos, Bloque A of. 1 La Paz - Bolivia
            </h3>
            <h3>
                Telefono: 2263451
            </h3>
            <h3>
                Celular: +591 69722332
            </h3>
          </div>
          <div>
            <h2 className="font-bold text-xl">REDES SOCIALES</h2>
            <div className="flex flex-col">
              <a href="https://wa.link/yfn51c" className="flex items-center gap-5 hover:scale-110 hover:font-bold duration-300">
                <FaWhatsapp className="h-10"/> Whatsapp
              </a>
              <a href='https://www.tiktok.com/@laramedoficial?_t=ZM-900M5z0n944&_r=1' className="flex items-center gap-5 hover:scale-110 hover:font-bold duration-300">
                <FaTiktok className="h-10" /> Tiktok
              </a>
              <a href="https://www.facebook.com/share/15VhJR85KF/" className="flex items-center gap-5 hover:scale-110 hover:font-bold duration-300">
                <FaFacebook className="h-10"/> Facebook
              </a>
            </div>
          </div>
        </footer>
    </div>
  );
}
