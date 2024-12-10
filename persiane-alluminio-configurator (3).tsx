import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Configurazione colori con campioni
const COLORI = {
  'bianco_9010': { 
    nome: 'Bianco 9010 opaco', 
    codice: '#FFFFFF', 
    incremento: 0 
  },
  'ral_7001': { 
    nome: 'RAL 7001 opaco', 
    codice: '#8F9696', 
    incremento: 0.05 
  },
  'ral_7016': { 
    nome: 'RAL 7016 opaco', 
    codice: '#383E42', 
    incremento: 0.05 
  },
  'ral_6005': { 
    nome: 'RAL 6005 opaco', 
    codice: '#2F4F4F', 
    incremento: 0.05 
  },
  'ral_8017': { 
    nome: 'RAL 8017 opaco', 
    codice: '#4A3328', 
    incremento: 0.05 
  },
  'golden_oak': { 
    nome: 'Golden Oak', 
    codice: '#D6A668', 
    incremento: 0.05 
  },
  'nussbaum': { 
    nome: 'Nussbaum', 
    codice: '#5D4037', 
    incremento: 0.05 
  }
};

const PersianneAlluminioConfigurator = () => {
  // State per la configurazione
  const [larghezza, setLarghezza] = useState('');
  const [altezza, setAltezza] = useState('');
  const [quantita, setQuantita] = useState(1);
  const [numeroCante, setNumeroCante] = useState(1);
  const [tipologiaLamelle, setTipologiaLamelle] = useState('fisse');
  const [sensoApertura, setSensoApertura] = useState('DX');
  const [tipoChiusura, setTipoChiusura] = useState('semplice');
  const [coloreSelezionato, setColoreSelezionato] = useState('bianco_9010');
  const [preventivo, setPreventivo] = useState(0);

  // Calcolo preventivo
  const calcolaPreventivo = () => {
    // Validazione input
    if (!larghezza || !altezza || larghezza <= 0 || altezza <= 0) {
      setPreventivo(0);
      return;
    }

    // Calcolo superficie
    const superficieMq = (larghezza * altezza) / 10000;
    
    // Prezzi base
    const prezzoLamelle = tipologiaLamelle === 'orientabili' ? 450 : 350;
    const prezzoSuperficie = superficieMq * prezzoLamelle;
    
    // Incremento per colore
    const incrementoColore = COLORI[coloreSelezionato].incremento;
    const prezzoColore = prezzoSuperficie * (1 + incrementoColore);
    
    // Costi aggiuntivi
    const prezzoChiusura = tipoChiusura === 'semplice' ? 50 : 25;
    
    // Calcolo totale
    const totale = (prezzoColore + prezzoChiusura) * quantita * numeroCante;
    
    setPreventivo(Math.round(totale));
  };

  // Effetto per ricalcolo automatico
  useEffect(() => {
    calcolaPreventivo();
  }, [
    larghezza, 
    altezza, 
    quantita, 
    numeroCante, 
    tipologiaLamelle, 
    sensoApertura, 
    tipoChiusura, 
    coloreSelezionato
  ]);

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuratore Persiane in Alluminio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Dimensioni */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Larghezza (cm)</Label>
                <Input 
                  type="number" 
                  placeholder="Larghezza" 
                  value={larghezza}
                  onChange={(e) => setLarghezza(e.target.value)}
                />
              </div>
              <div>
                <Label>Altezza (cm)</Label>
                <Input 
                  type="number" 
                  placeholder="Altezza"
                  value={altezza}
                  onChange={(e) => setAltezza(e.target.value)}
                />
              </div>
            </div>

            {/* Quantità */}
            <div>
              <Label>Quantità</Label>
              <Input 
                type="number" 
                min="1" 
                value={quantita}
                onChange={(e) => setQuantita(parseInt(e.target.value))}
              />
            </div>

            {/* Numero Ante */}
            <div>
              <Label>Numero Ante</Label>
              <Select 
                value={numeroCante.toString()} 
                onValueChange={(value) => setNumeroCante(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona numero ante" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Anta{num > 1 ? 'e' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tipologia Lamelle */}
            <div>
              <Label>Tipologia Lamelle</Label>
              <Select 
                value={tipologiaLamelle} 
                onValueChange={setTipologiaLamelle}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipologia lamelle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fisse">Lamelle Fisse (350€/mq)</SelectItem>
                  <SelectItem value="orientabili">Lamelle Orientabili (450€/mq)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Senso Apertura */}
            <div>
              <Label>Senso Apertura</Label>
              <Select 
                value={sensoApertura} 
                onValueChange={setSensoApertura}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona senso apertura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DX">Apertura Destra (DX)</SelectItem>
                  <SelectItem value="SX">Apertura Sinistra (SX)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo Chiusura */}
            <div>
              <Label>Tipo Chiusura</Label>
              <Select 
                value={tipoChiusura} 
                onValueChange={setTipoChiusura}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo chiusura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semplice">Serratura Semplice (+50€)</SelectItem>
                  <SelectItem value="maniglia">Maniglia con Serratura (+25€)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selezione Colore */}
            <div>
              <Label>Colore</Label>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(COLORI).map(([key, colore]) => (
                  <div 
                    key={key}
                    className={`
                      p-2 rounded cursor-pointer border-2 
                      ${coloreSelezionato === key ? 'border-blue-500' : 'border-transparent'}
                    `}
                    onClick={() => setColoreSelezionato(key)}
                  >
                    <div 
                      className="w-full h-10 rounded"
                      style={{ backgroundColor: colore.codice }}
                    />
                    <p className="text-xs text-center mt-1">{colore.nome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Riepilogo Preventivo */}
      <Card>
        <CardHeader>
          <CardTitle>Riepilogo Ordine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Dimensioni:</strong> {larghezza} x {altezza} cm
            </div>
            <div>
              <strong>Quantità:</strong> {quantita}
            </div>
            <div>
              <strong>Numero Ante:</strong> {numeroCante}
            </div>
            <div>
              <strong>Tipologia Lamelle:</strong> {tipologiaLamelle === 'fisse' ? 'Fisse' : 'Orientabili'}
            </div>
            <div>
              <strong>Senso Apertura:</strong> {sensoApertura}
            </div>
            <div>
              <strong>Tipo Chiusura:</strong> {tipoChiusura === 'semplice' ? 'Serratura Semplice' : 'Maniglia con Serratura'}
            </div>
            <div>
              <strong>Colore Selezionato:</strong> {COLORI[coloreSelezionato].nome}
            </div>
            <div className="text-2xl font-bold text-blue-700">
              Preventivo Totale: €{preventivo.toLocaleString()}
            </div>
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => alert('Funzionalità di invio preventivo in sviluppo')}
            >
              Richiedi Preventivo
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersianneAlluminioConfigurator;
