import { FaWhatsapp, FaFacebook, FaTiktok } from 'react-icons/fa';

export default function Footer(){
  return(
    <footer className="bg-[#15599a] h-[50dvh] grid items-center md:grid-cols-3 text-white font-semibold place-items-center px-4">
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
        <div className="flex gap-6 items-center font-bold justify-around">
          <a href="https://wa.link/yfn51c">
            <FaWhatsapp className="h-12"/>
          </a>
          <a href='https://www.tiktok.com/@laramedoficial?_t=ZM-900M5z0n944&_r=1'>
            <FaTiktok className="h-12" />
          </a>
          <a href="https://www.facebook.com/share/15VhJR85KF/">
            <FaFacebook className="h-12"/>
          </a>
        </div>
      </div>
    </footer>
  );
}
