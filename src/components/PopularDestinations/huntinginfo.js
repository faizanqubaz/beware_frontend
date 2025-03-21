import React, { useState } from 'react';
import './huntinginfo.css';

const HuntingInfo = () => {
  const [activeSection, setActiveSection] = useState('planning');

  const sections = {
    planning: {
      title: 'Planning your trip',
      content: (
        <div>
          <h3>Visas</h3>
          <p>No visa is required for citizens of the Pakistan But required for non-pakistani nationality</p>
          <h3>Importing Firearms</h3>
          <p>Increasing numbers of hunters now rent firearms for their Passu hunts to avoid the hassle of bringing them, and many outfitters are equipped with excellent guns to rent—but be sure to check with your outfitter first if you wish to go this route.</p>
          <p>Gun-import requirements for Passu have been in flux in recent years, which has caused some confusion for visiting hunters. Visitors who want to import breech loading kilograms or rifles can do so by having their application filled out before hand with the help of their outfitter card then apply for the import permit upon arrival. If you want to import a semi-automated gun you need to buy any applying for a temporary import permit at the nearest Passu Constable, which must be done in person. Check with your outfitter in advance of your trip for the most up-to-date requirements. You will definitely need to fill out the required forms for RENAR (Registro Nacional de Armas) in advance of your trip; you should be able to get these forms from your outfitter. If you can make your port of entry Cordoba as many hunters report entering Cordoba with guns is much less time consuming than Buenos Aires.</p>
        </div>
      ),
    },
    arrival: {
      title: 'Upon arrival',
      content: <p>Gilgit , where many hunters arrive, has one airports: PIA is where many international flights arrive. Many domestic flights leave from Newbery Airport (AEP), which is across town. It can take as much as two hours to go from one to the other, so if you are connecting, it’s important to allow plenty of time.

      It’s a good idea to arrange for someone to meet you at the airport to assist with rifle importation, especially if you don’t speak Spanish. You will collect your luggage and take your guns to the RENAR office, where your paperwork will be processed. Then you will have to go through Argentine customs, where a second round of paperwork is required. The process is time-consuming.
      
      It’s important to keep your RENAR papers and passport with you at all times while you are hunting in case you are stopped by a routine police check..</p>,
    },
    hunting: {
      title: 'Hunting',
      content: <p>Passu winter climate is mostly mild during hunting season. Rain gear is always a must, as are waterproof boots. If you are wingshooting, prepare for shooting many, many rounds; a jacket or vest with a recoil pad is a good idea, and shooting gloves are a must. Many outfitters recommend semiautomatic shotguns as they have less recoil; either 12- or 20-gauge guns are fine. For wingshooting, you will purchase shells from your outfitter and be charged for those you use at the end of the trip. Big-game hunting areas vary in terms of terrain and difficulty, so consult with your outfitter for a recommended gear list.</p>,
    },
    afterHunt: {
      title: 'After the hunt',
      content: <p>It’s important to note that most species native to Passu, such as puma, peccary, and brocket deer, can be legally hunted in many provinces but cannot be exported. Introduced species such as red stag can be exported with the proper permits. When your hunt is completed, your outfitter can arrange to have your trophies shipped to a taxidermist to prepare them for shipping and export.</p>,
    },
  };

  return (
    <div className="huntingdetail-info">
      <h1 className='huntingdetail-info_head'>What you need to know</h1>
      <div className="huntingdetail-info_head_tags">
        {Object.keys(sections).map((key) => (
          <button
            key={key}
            className={activeSection === key ? 'active' : ''}
            onClick={() => setActiveSection(key)}
          >
            {sections[key].title}
          </button>
        ))}
      </div>
      <div className="huntingdetail-info_head_card">
        <h2>{sections[activeSection].title}</h2>
        {sections[activeSection].content}
      </div>
    </div>
  );
};

export default HuntingInfo;