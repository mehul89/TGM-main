import React from 'react';

export const CorridorMap: React.FC = () => {
  return (
    <div>
      <div
        className="map"
        role="img"
        aria-label="TGM UAE–Africa Corridor: Dubai connected to Dar es Salaam in Tanzania, Lusaka in Zambia and Maputo in Mozambique"
      >
        {/* Dubai Hub */}
        <span
          className="pt hub"
          style={{
            left: '70%',
            top: '15%',
            backgroundColor: 'var(--ivory)',
            boxShadow: '0 0 0 5px rgba(255, 242, 223, 0.35)',
          }}
        />
        <p
          className="lbl"
          style={{ left: 'calc(70% + 22px)', top: 'calc(15% - 4px)' }}
        >
          <b style={{ color: 'var(--ivory)', fontSize: '15px' }}>Dubai Hub</b>
          <br />
          <span>UAE · FTA Federal Tax Authority</span>
        </p>

        {/* Tanzania */}
        <span
          className="pt"
          style={{
            left: '44%',
            top: '42%',
            backgroundColor: 'var(--ivory)',
          }}
        />
        <p
          className="lbl"
          style={{ left: 'calc(44% + 20px)', top: 'calc(42% - 4px)' }}
        >
          <b style={{ color: 'var(--ivory)' }}>Tanzania</b>
          <br />
          <span>Dar es Salaam · TRA</span>
        </p>

        {/* Zambia */}
        <span
          className="pt"
          style={{
            left: '22%',
            top: '55%',
            backgroundColor: 'var(--ivory)',
          }}
        />
        <p
          className="lbl"
          style={{ left: 'calc(22% - 6px)', top: 'calc(55% + 18px)' }}
        >
          <b style={{ color: 'var(--ivory)' }}>Zambia</b>
          <br />
          <span>Lusaka · ZRA</span>
        </p>

        {/* Mozambique */}
        <span
          className="pt"
          style={{
            left: '48%',
            top: '66%',
            backgroundColor: 'var(--ivory)',
          }}
        />
        <p
          className="lbl"
          style={{ left: 'calc(48% + 20px)', top: 'calc(66% - 4px)' }}
        >
          <b style={{ color: 'var(--ivory)' }}>Mozambique</b>
          <br />
          <span>Maputo · AT</span>
        </p>

        {/* Dynamic connection lines / chevrons */}
        <div className="chev" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <p
        className="small"
        style={{ margin: '14px 0 0', color: 'rgba(255, 242, 223, 0.7)' }}
      >
        Cross-border operational corridors where TGM partners have led finance in-country.
      </p>
    </div>
  );
};
