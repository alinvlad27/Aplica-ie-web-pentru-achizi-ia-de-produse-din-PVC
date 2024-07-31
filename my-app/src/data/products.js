import productImg02 from "../images/usa2.jpg";
import productImg03 from "../images/usa3.jpg";
import productImg04 from "../images/usa4.jpg";
import productImg05 from "../images/usa5.jpg";
import productImg06 from "../images/usa6.jpg";
import productImg07 from "../images/usa7.jpg";
import productImg08 from "../images/usa8.jpg";
import productImg09 from "../images/usa9.jpg";
import productImg10 from "../images/usa10.jpg";
import productImg11 from "../images/usa11.jpg";
import productImg12 from "../images/usa12.jpg";
import productImg13 from "../images/usa13.jpg";
import productImg14 from "../images/usa14.jpg";
import productImg15 from "../images/usa15.jpg";

import productImg25 from "../images/fereastra1.jpg";
import productImg16 from "../images/fereastra2.jpg";
import productImg17 from "../images/fereastra3.jpg";
import productImg18 from "../images/fereastra4.jpg";
import productImg19 from "../images/fereastra10.jpg";
import productImg20 from "../images/fereastra5.jpg";
import productImg21 from "../images/fereastra6.jpg";
import productImg22 from "../images/fereastra7.jpg";
import productImg23 from "../images/fereastra8.jpg";
import productImg24 from "../images/fereastra9.jpg";
import productImg26 from "../images/fereastra11.jpg";

import { storage, db } from '../config/Config';

const products = [
  {
    id: "01",
    productName: "Fereastră PVC Simplă Modernă",
    imgUrl: productImg24,
    category: "Fereastră",
    price: 1792,
    shortDesc:
      "Această fereastră din PVC, cu dimensiuni de 1600 mm lățime și 1600 mm înălțime, este ideală pentru a adăuga un plus de eleganță și funcționalitate casei tale. Culoarea albă oferă un aspect curat și luminos, iar designul cu grilaj adaugă un element clasic și rafinat. Sticla dublu stratificată asigură o izolare termică și fonică excelentă.",
    description:
      "Această fereastră din PVC, având o lățime de 1600 mm și o înălțime de 1600 mm, este perfectă pentru a combina stilul clasic cu funcționalitatea modernă. Culoarea albă aduce un aspect proaspăt și curat, integrându-se armonios în orice fațadă. Designul cu grilaj adaugă un element decorativ clasic și elegant, care completează perfect estetica casei tale. Sticla dublu stratificată nu doar că îmbunătățește eficiența energetică a locuinței, dar oferă și o izolare fonică superioară, contribuind la un mediu interior liniștit și confortabil. Materialul PVC de înaltă calitate asigură durabilitate și rezistență în timp, fără necesitatea unei întrețineri frecvente. Fereastra este ideală pentru orice încăpere unde se dorește o bună iluminare naturală, păstrând în același timp intimitatea și confortul termic.",
    reviews: [
      {
        rating: 4.8,
        text: "Am avut parte de o instalare rapidă și profesională. Produsul este foarte durabil și arată minunat.",
      },
    ],
    avgRating: 4.5,
  },

  {
    id: "02",
    productName: "Fereastra Premium Arcadia",
    imgUrl: productImg16,
    category: "Fereastră",
    price: 1848,
    shortDesc:
      "Această fereastră din PVC, cu dimensiuni de 2200 mm lățime și 1200 mm înălțime, este ideală pentru a adăuga un aspect modern și elegant casei tale. Culoarea gri antracit îi conferă un stil contemporan, iar sticla dublu stratificată oferă o izolare termică și fonică excelentă. Designul cu trei panouri mari asigură o iluminare naturală generoasă.",
    description:
      "Această fereastră din PVC, având o lățime de 2200 mm și o înălțime de 1200 mm, este perfectă pentru a aduce un plus de lumină naturală în locuința ta. Culoarea gri antracit îi conferă un aspect modern și sofisticat, integrându-se armonios în fațadele contemporane. Sticla dublu stratificată asigură o izolare termică și fonică superioară, contribuind la menținerea unui mediu interior confortabil și liniștit. Designul său include trei panouri mari, care nu doar că permit pătrunderea unei cantități mari de lumină naturală, dar și oferă o vedere panoramică impresionantă. Materialul PVC de înaltă calitate garantează durabilitate și întreținere ușoară, rezistând excelent în timp și condițiilor meteorologice variabile. Această fereastră este ideală pentru orice cameră unde se dorește maximizarea luminii naturale, păstrând în același timp un nivel ridicat de intimitate și eficiență energetică.",
    reviews: [
      {
        rating: 4.8,
        text: "Suntem extrem de mulțumiți de achiziția noastră. Produsele oferă un raport calitate-preț excelent.",
      },

    ],
    avgRating: 4.7,
  },

  {
    id: "03",
    productName: "Ușă Modernă PVC Geometric",
    imgUrl: productImg02,
    category: "Ușă",
    price: 2093,
    shortDesc:
      "Această ușă din PVC, cu dimensiuni de 1300 mm lățime și 2300 mm înălțime, este ideală pentru accesul principal al clădirilor. Culoarea gri închis oferă un aspect modern și elegant, iar geamurile mari permit o iluminare naturală abundentă. Designul său cu panouri multiple asigură atât securitate, cât și estetică deosebită.",
    description:
      "Această ușă modernă din PVC, având o lățime de 1300 mm și o înălțime de 2300 mm, este perfectă pentru accesul principal al clădirilor rezidențiale sau comerciale. Culoarea gri închis adaugă un plus de eleganță și rafinament, potrivindu-se excelent în orice context arhitectural contemporan. Ușa este echipată cu geamuri mari care permit pătrunderea abundentă a luminii naturale, creând astfel o atmosferă luminoasă și primitoare în interior. Designul său include panouri multiple, care oferă atât securitate sporită prin materialele durabile și sistemul de închidere robust, cât și un aspect estetic deosebit. Fabricată din PVC de înaltă calitate, această ușă garantează durabilitate și rezistență în timp, fiind capabilă să facă față cu succes condițiilor meteorologice variabile. Este alegerea ideală pentru cei care doresc să combine securitatea cu un design modern și atrăgător, aducând astfel un plus de valoare și funcționalitate locuinței sau clădirii lor.",
    reviews: [
      {
        rating: 4.7,
        text: "Calitatea premium a produselor și eficiența energetică sunt evidente de la prima utilizare.",
      },

    ],
    avgRating: 4.7,
  },
  {
    id: "26",
    productName: "Fereastră Rabatabilă PVC",
    imgUrl: productImg17,
    category: "Fereastră",
    price: 1008,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1800 mm lățime și 800 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "04",
    productName: "Ușă Patio PVC Panoramică",
    imgUrl: productImg03,
    category: "Trending",
    price: 2415,
    shortDesc:
      "Această ușă din PVC, cu dimensiuni de 1500 mm lățime și 2300 mm înălțime, este ideală pentru accesul către terasă sau grădină. Culoarea gri antracit îi conferă un aspect modern și sofisticat. Dispune de geamuri duble stratificate pentru o izolare termică și fonică excelentă, iar designul său include ferestre laterale fixe și o deschidere dublă centrală, asigurând securitate și lumină naturală.",
    description:
      "Această ușă din PVC, având o lățime de 1500 mm și o înălțime de 2300 mm, este perfectă pentru accesul către terasă sau grădină, aducând un plus de funcționalitate și estetică locuinței tale. Culoarea gri antracit îi conferă un aspect modern și sofisticat, integrându-se armonios în fațadele contemporane. Ușa este echipată cu geamuri duble stratificate, care asigură o izolare termică și fonică de înaltă performanță, contribuind la confortul interior. Designul său include ferestre laterale fixe, care permit pătrunderea luminii naturale, și o deschidere dublă centrală, oferind atât securitate sporită, cât și un acces facil. Fabricată din materiale de calitate superioară, această ușă este durabilă și rezistentă la condițiile meteorologice variabile, fiind o alegere excelentă pentru orice locuință modernă.",
    reviews: [
      {
        rating: 4.6,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "05",
    productName: "Fereastră PVC Mată Ventilată",
    imgUrl: productImg18,
    category: "Fereastră",
    price: 1575,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1500 mm lățime și 1500 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.6,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "06",
    productName: "Ușă Principală PVC Design Lemn",
    imgUrl: productImg04,
    category: "Ușă",
    price: 2184,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1200 mm lățime și 2600 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.6,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "07",
    productName: "Fereastră Îngustă PVC Rabatabilă",
    imgUrl: productImg19,
    category: "Fereastră",
    price: 1372,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1400 mm lățime și 1400 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "27",
    productName: "Ușă Dublă PVC Aspect Lemn",
    imgUrl: productImg05,
    category: "Ușă",
    price: 2457,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1300 mm lățime și 2700 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 5.0,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },

    ],
    avgRating: 4.7,
  },

  {
    id: "08",
    productName: "Fereastră Triple PVC Panoramică",
    imgUrl: productImg20,
    category: "Fereastră",
    price: 735,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 700 mm lățime și 1500 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "09",
    productName: "Ușă Dublă PVC Rustic Modern",
    imgUrl: productImg06,
    category: "Trending",
    price: 2100,
    shortDesc:
      "Această ușă din PVC, cu dimensiuni de 1200 mm lățime și 2500 mm înălțime, este ideală pentru intrările principale. Culoarea lemn deschis adaugă un aspect rustic și cald, completând designul exterior al casei. Dispune de geamuri multiple, oferind intimitate și lumină naturală. Designul cu deschidere dublă centrală și geamuri duble stratificate asigură securitate și izolare termică și fonică excelentă.",
    description:
      "Această ușă elegantă din PVC, cu dimensiuni de 1200 mm lățime și 2500 mm înălțime, este perfectă pentru intrările principale ale locuinței tale. Designul său rafinat combină funcționalitatea cu estetica, oferind un aspect rustic și cald datorită culorii de lemn deschis, care se integrează armonios în orice stil arhitectural exterior. Ușa este dotată cu geamuri multiple, care creează un echilibru ideal între intimitate și lumină naturală, permițând astfel pătrunderea luminii în interior fără a compromite intimitatea spațiului. Sticla dublu stratificată folosită pentru geamuri asigură o izolare termică și fonică superioară, contribuind la eficiența energetică a casei și la reducerea zgomotului exterior. Acest aspect este esențial pentru menținerea unui mediu confortabil și liniștit în interiorul locuinței.",
    reviews: [
      {
        rating: 4.6,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "10",
    productName: "Fereastră PVC Rabatabilă Albă",
    imgUrl: productImg21,
    category: "Trending",
    price: 1680,
    shortDesc:
      "Această fereastră din PVC are o lățime de 2000 mm și o înălțime de 1200 mm, fiind perfectă pentru spații mari. Culoarea gri antracit îi conferă un aspect modern și elegant. Dispune de sticlă dublu stratificată pentru o izolare termică și fonică superioară. Designul include o deschidere centrală dublă și două ferestre laterale fixe.",
    description:
      "Această fereastră modernă din PVC, cu o lățime de 2000 mm și o înălțime de 1200 mm, este ideală pentru a aduce un aport generos de lumină naturală în orice încăpere. Culoarea gri antracit adaugă un plus de eleganță și sofisticare, potrivindu-se perfect în diverse stiluri arhitecturale, de la cele contemporane la cele minimaliste. Fereastra dispune de geamuri dublu stratificate, care asigură o izolare termică și fonică superioară. Acest tip de sticlă este ideal pentru a menține o temperatură constantă în interior și pentru a reduce zgomotul exterior, contribuind astfel la confortul general al locuinței. Designul fereastrei este unul funcțional și estetic deosebit, incluzând o deschidere centrală dublă care facilitează ventilația eficientă și accesul facil. Cele două ferestre laterale fixe completează aspectul modern și permit o vedere panoramică, maximizând aportul de lumină naturală.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "25",
    productName: "Ușă Principală PVC Panoramică",
    imgUrl: productImg07,
    category: "Ușă",
    price: 3059,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1900 mm lățime și 2300 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.6,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "11",
    productName: "Fereastră Colț PVC Panoramică",
    imgUrl: productImg22,
    category: "Fereastră",
    price: 1785,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1500 mm lățime și 1700 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "12",
    productName: "Ușă Exterior PVC Clasică",
    imgUrl: productImg08,
    category: "Ușă",
    price: 2352,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1600 mm lățime și 2100 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "13",
    productName: "Fereastră PVC Simplă Modernă",
    imgUrl: productImg23,
    category: "Fereastră",
    price: 1799,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "14",
    productName: "Ușă Principală PVC Contemporană",
    imgUrl: productImg09,
    category: "Ușă",
    price: 3059,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1900 mm lățime și 2300 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "15",
    productName: "Ușă Principală PVC Geometric",
    imgUrl: productImg10,
    category: "Ușă",
    price: 3234,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 2100 mm lățime și 2200 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "16",
    productName: "Ușă Principală PVC Modernă",
    imgUrl: productImg11,
    category: "Ușă",
    price: 2737,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1700 mm lățime și 2300 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "17",
    productName: "Ușă Principală PVC Panoramă",
    imgUrl: productImg12,
    category: "Trending",
    price: 2002,
    shortDesc:
      "Această ușă din PVC are o lățime de 1300 mm și o înălțime de 2200 mm, fiind ideală pentru accesul către exterior. Culoarea neagră îi conferă un aspect modern și elegant, iar geamurile mari permit pătrunderea abundentă a luminii naturale. Designul său asigură atât securitate, cât și estetica deosebită.",
    description:
      "Această ușă elegantă din PVC, având dimensiuni de 1300 mm lățime și 2200 mm înălțime, este perfectă pentru a crea un acces generos către grădină sau terasă. Culoarea neagră adaugă un plus de sofisticare și modernitate, completând perfect fațadele contemporane. Ușa dispune de geamuri mari care permit pătrunderea abundentă a luminii naturale, iluminând interiorul în mod natural și creând o atmosferă plăcută. Designul său oferă un echilibru ideal între funcționalitate și estetică, asigurând securitatea necesară prin materialele durabile și sistemul de închidere robust. Această ușă este fabricată din PVC de înaltă calitate, garantând o durabilitate excelentă și rezistență la intemperii. Este alegerea perfectă pentru cei care doresc să adauge un element modern și elegant locuinței lor, beneficiind totodată de performanțe superioare în izolare termică și fonică.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "18",
    productName: "Ușă Principală PVC Mată",
    imgUrl: productImg13,
    category: "Ușă",
    price: 2618,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1700 mm lățime și 2200 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "19",
    productName: "Ușă Principală PVC Argintie",
    imgUrl: productImg14,
    category: "Ușă",
    price: 3542,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 2200 mm lățime și 2300 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "20",
    productName: "Fereastră Glisantă PVC cu Grilaj",
    imgUrl: productImg15,
    category: "Fereastră",
    price: 1995,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1500 mm lățime și 1900 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "22",
    productName: "Fereastră PVC Clasică cu Grilaj",
    imgUrl: productImg25,
    category: "Fereastră",
    price: 1680,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1500 mm lățime și 1600 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },

    ],
    avgRating: 4.8,
  },

  {
    id: "30",
    productName: "Fereastră PVC Clasică Gri",
    imgUrl: productImg26,
    category: "Fereastră",
    price: 1575,
    shortDesc:
      "Bucură-te de confort și siguranță cu ferestrele și ușile noastre din PVC, cu dimensiuni de 1500 mm lățime și 1500 mm înălțime, proiectate pentru izolare termică și fonică superioară. Personalizabile în diverse dimensiuni și culori, acestea oferă durabilitate și un design modern, completând perfect orice stil arhitectural.",
    description:
      "Acest model combină durabilitatea materialelor de top cu un design modern, perfect pentru orice casă sau spațiu comercial. Profită acum de oferta noastră specială! Comandă online și beneficiezi de consultanță gratuită pentru măsurători și instalare profesională.",
    reviews: [
      {
        rating: 4.8,
        text: "Experiența noastră a fost fantastică, de la consultanță până la instalare. Produsele sunt de top!",
      },

    ],
    avgRating: 4.8,
  },
];


// Funcție pentru a încărca produsele în Firestore
const uploadProducts = async () => {
  // Recuperează produsele existente din Firestore
  const productsCollection = await db.collection('products').get();
  const firebaseProducts = productsCollection.docs.map(doc => doc.data());

  // Parcurge fiecare produs din array-ul local `products`
  for (const product of products) {
    const { id, productName, imgUrl, category, price, shortDesc, description, reviews, avgRating } = product;

    // Verifică dacă produsul există deja în Firestore
    const productExists = firebaseProducts.some(firebaseProduct => firebaseProduct.id === id);
    if (productExists) {
      console.log(`${productName} already exists in Firestore`);
      continue; // Dacă produsul există, trece la următorul produ
    }

    // Încarcă imaginea produsului în Firebase Storage
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const uploadTask = storage.ref(`Images/${id}`).put(blob);

    // Monitorizează progresul încărcării imaginii
    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    }, error => {
      console.log(error.message);
    }, async () => {
      // Obține URL-ul imaginii încărcate
      const url = await storage.ref('Images').child(id).getDownloadURL();
      // Adaugă produsul în Firestore cu URL-ul imaginii
      await db.collection('products').add({
        id,
        productName,
        ProductPrice: Number(price),
        ProductImg: url,
        category,
        shortDesc,
        description,
        reviews,
        avgRating
      });
      console.log(`${productName} has been added to Firestore with image URL: ${url}`);
    });
  }
};

// Apelează funcția pentru a încărca produsele
uploadProducts();

export default products;