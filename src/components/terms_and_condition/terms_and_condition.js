import React, { useState } from 'react';
import './terms_and_condition.css'
import FooterComponent from '../Footer/footer';

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const sections = [
        {
            title: '1. Reservations & Payments',
            content: (
                <div>
                <p><strong>1.1.</strong> Hunting activities are potentially dangerous. The operating company, outfitter, and team will apply the necessary measures to preserve the customers’ safety...</p>
                <p><strong>1.2.</strong> Passu Conservency draws your attention to the fact that there are certain inherent risks involved in participating in the type of trip sold by this Conservency...</p>
                <p><strong>1.3.</strong> It is your sole responsibility to take all appropriate medical advice prior to departure as to whether you are fit enough to take the trip booked...</p>
            </div>
            ),
        },
        {
            title: '2. Cancellations & Refunds',
            content: (
                <div>
                <p><strong>2.1.</strong> Hunting activities are potentially dangerous. The operating company, outfitter, and team will apply the necessary measures to preserve the customers’ safety...</p>
                <p><strong>2.2.</strong> Passu Conservency draws your attention to the fact that there are certain inherent risks involved in participating in the type of trip sold by Passu Conservency...</p>
                <p><strong>2.3.</strong> It is your sole responsibility to take all appropriate medical advice prior to departure as to whether you are fit enough to take the trip booked...</p>
            </div>
            ),
        },
        {
            title: '3. For your information',
            content: (
                <div>
                <p><strong>3.1.</strong> Hunting activities are potentially dangerous. The operating company, outfitter, and team will apply the necessary measures to preserve the customers’ safety...</p>
                <p><strong>3.2.</strong> Passu Conservency draws your attention to the fact that there are certain inherent risks involved in participating in the type of trip sold by Passu Conservency...</p>
                <p><strong>3.3.</strong> It is your sole responsibility to take all appropriate medical advice prior to departure as to whether you are fit enough to take the trip booked...</p>
            </div>
            ),
        },
        {
            title: '4. Risks',
            content: (
                <div>
                    <p><strong>4.1.</strong> Hunting activities are potentially dangerous. The operating company, outfitter, and team will apply the necessary measures to preserve the customers’ safety...</p>
                    <p><strong>4.2.</strong> Passu Conservency draws your attention to the fact that there are certain inherent risks involved in participating in the type of trip sold by Passu Conservency...</p>
                    <p><strong>4.3.</strong> It is your sole responsibility to take all appropriate medical advice prior to departure as to whether you are fit enough to take the trip booked...</p>
                </div>
            ),
        },
        {
            title: '5. Force Majeure',
            content: (
                <div>
                <p><strong>3.1.</strong> Hunting activities are potentially dangerous. The operating company, outfitter, and team will apply the necessary measures to preserve the customers’ safety...</p>
                <p><strong>3.2.</strong> Passu Conservency draws your attention to the fact that there are certain inherent risks involved in participating in the type of trip sold by Passu Conservency...</p>
                <p><strong>3.3.</strong> It is your sole responsibility to take all appropriate medical advice prior to departure as to whether you are fit enough to take the trip booked...</p>
            </div>
            ),
        },
        {
            title: '6. Insurance',
            content: (
                <div>
                <p><strong>3.1.</strong> Hunting activities are potentially dangerous. The operating company, outfitter, and team will apply the necessary measures to preserve the customers’ safety...</p>
                <p><strong>3.2.</strong> Passu Conservency draws your attention to the fact that there are certain inherent risks involved in participating in the type of trip sold by Passu Conservency...</p>
                <p><strong>3.3.</strong> It is your sole responsibility to take all appropriate medical advice prior to departure as to whether you are fit enough to take the trip booked...</p>
            </div>
            ),
        },
        {
            title: '7. Surcharges',
            content: (
                <div>
                <p><strong>3.1.</strong> Hunting activities are potentially dangerous. The operating company, outfitter, and team will apply the necessary measures to preserve the customers’ safety...</p>
                <p><strong>3.2.</strong> Passu Conservency draws your attention to the fact that there are certain inherent risks involved in participating in the type of trip sold by Passu Conservency...</p>
                <p><strong>3.3.</strong> It is your sole responsibility to take all appropriate medical advice prior to departure as to whether you are fit enough to take the trip booked...</p>
            </div>
            ),
        },
    ];

    const toggleSection = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <>
        <div className='terms_and_condition_header'>
          <h3 className='terms_and_condition_heading'>TERMS AND CONDITIONS – PASSU BATURA IBEX</h3>
        </div>
      
        <div style={{ width: '800px', margin: '0 auto' }}>
            {sections.map((section, index) => (
                <div key={index}>
                    <div onClick={() => toggleSection(index)} style={styles.header}>
                        <h3>{section.title}</h3>
                        <span>{activeIndex === index ? '▲' : '▼'}</span>
                    </div>
                    {activeIndex === index && (
                        <div style={styles.content}>
                            {section.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
        <FooterComponent />
        </>
    );
};

const styles = {
    header: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
    },
    content: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
};

export default Accordion;
