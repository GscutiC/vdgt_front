import React, { useState } from 'react';

const NuevoProyecto = () => {
  const [formData, setFormData] = useState({
  tipoProyecto: '',
  cantidad: 1,
  dimensiones: [{ ancho: '', alto: '' }],
  unidadMedida: 'mm',
  tipoVidrio: '',
  tipoAluminio: '',
  colorVidrio:"", 
  colorAluminio: ''
  });
  const [errors, setErrors] = useState({
    ancho: '',
    alto: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('vidrio');
  const [resultData, setResultData] = useState({
    nombreProyecto: '',
    tipoProyecto: '',
    dimensiones: '',
    materialesVidrio: [],
    materialesAluminio: [],
    optimizacion: {
      plancha1: [],
      plancha2: [],
      desperdicio: 0
    },
    areaTotal: 0,
    desperdicio: 0
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cantidad') {
      const nuevaCantidad = parseInt(value);
      const nuevasDimensiones = Array.from({ length: nuevaCantidad }, (_, i) => formData.dimensiones[i] || { ancho: '', alto: '' });

      setFormData(prev => ({
        ...prev,
        cantidad: nuevaCantidad,
        dimensiones: nuevasDimensiones
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (showResults) setShowResults(false);
  };
  const handleDimensionChange = (index, campo, valor) => {
    const nuevasDimensiones = [...formData.dimensiones];
    nuevasDimensiones[index][campo] = valor;

    setFormData(prev => ({
      ...prev,
      dimensiones: nuevasDimensiones
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    let newErrors = [];

    formData.dimensiones.forEach((dim, i) => {
      const ancho = parseFloat(dim.ancho);
      const alto = parseFloat(dim.alto);
      if (isNaN(ancho) || ancho < 10 || isNaN(alto) || alto < 10) {
        newErrors[i] = { ancho: 'Ancho mínimo 10', alto: 'Alto mínimo 10' };
        hasError = true;
      } else {
        newErrors[i] = { ancho: '', alto: '' };
      }
    });
    setErrors(newErrors);
    if (hasError) return;
    calcularMateriales();
  };
  const calcularMateriales = () => {
    const factor = formData.unidadMedida === 'cm' ? 10 : 1;
    const anchoMM = parseFloat(formData.ancho) * factor;
    const altoMM = parseFloat(formData.alto) * factor;
    let materialesVidrio = [];
    let materialesAluminio = [];
    let areaTotal = 0;
    let optimizacion = {
      plancha1: [],
      plancha2: [],
    };
    if (formData.tipoProyecto === 'ventana') {
      materialesVidrio = [
        { descripcion: 'Vidrio Templado 6mm', dimensiones: '1900mm x 900mm', cantidad: 2, area: (1900 * 900 / 1000000).toFixed(2) },
        { descripcion: 'Vidrio Templado 6mm', dimensiones: '1400mm x 900mm', cantidad: 2, area: (1400 * 900 / 1000000).toFixed(2) },
        { descripcion: 'Vidrio Templado 6mm', dimensiones: '900mm x 900mm', cantidad: 1, area: (900 * 900 / 1000000).toFixed(2) }
      ];
      areaTotal = materialesVidrio.reduce((sum, item) => sum + parseFloat(item.area) * item.cantidad, 0);
      materialesAluminio = [
        { codigo: `${formData.tipoAluminio}-5221`, descripcion: 'Marco Superior', longitud: `${anchoMM}mm`, cantidad: 1 },
        { codigo: `${formData.tipoAluminio}-3210`, descripcion: 'Marco Inferior', longitud: `${anchoMM}mm`, cantidad: 1 },
        { codigo: `${formData.tipoAluminio}-7965`, descripcion: 'Jamba Lateral', longitud: `${altoMM}mm`, cantidad: 2 },
        { codigo: `${formData.tipoAluminio}-3004`, descripcion: 'Poste Central', longitud: `${altoMM}mm`, cantidad: 1 },
        { codigo: `${formData.tipoAluminio}-8463`, descripcion: 'Hoja Corrediza', longitud: `${altoMM}mm`, cantidad: 2 },
        {codigo: `${formData.tipoAluminio}-9116`, descripcion: 'Jamba Lateral', longitud: `${altoMM}mm`, cantidad: 2 },
        { codigo: `${formData.tipoAluminio}-8220`, descripcion: 'Poste Central', longitud: `${altoMM}mm`, cantidad: 1 },
      ];
      optimizacion = {
        plancha1: [
          { dimensiones: '1900mm x 900mm', cantidad: 2 },
          { dimensiones: '900mm x 900mm', cantidad: 1 }
        ],
        plancha2: [
          { dimensiones: '1400mm x 900mm', cantidad: 2 }
        ],
      };
    } else if (formData.tipoProyecto === 'puerta') {
      const areaVidrio = (anchoMM * altoMM / 1000000).toFixed(2);
      materialesVidrio = [
        { descripcion: `${formData.tipoVidrio || 'Vidrio Templado 6mm'}`, dimensiones: `${anchoMM}mm x ${altoMM}mm`, cantidad: 1, area: areaVidrio }
      ];
      areaTotal = parseFloat(areaVidrio);
      materialesAluminio = [
        { codigo: `${formData.tipoAluminio || 'S50'}-201`, descripcion: 'Marco Perimetral', longitud: `${(anchoMM * 2 + altoMM * 2)}mm total`, cantidad: 1 },
        { codigo: `${formData.tipoAluminio || 'S50'}-202`, descripcion: 'Horizontal Inferior', longitud: `${anchoMM}mm`, cantidad: 1 },
        { codigo: `${formData.tipoAluminio || 'S50'}-203`, descripcion: 'Vertical Batiente', longitud: `${altoMM}mm`, cantidad: 1 }
      ];
        optimizacion = {
        plancha1: [
          { dimensiones: `${anchoMM}mm x ${altoMM}mm`, cantidad: 1 }
        ],
        plancha2: [],
        desperdicio: 10.5
      };
    } else if (formData.tipoProyecto === 'mampara') {
      const areaVidrio = (anchoMM * altoMM / 1000000).toFixed(2);
      materialesVidrio = [
        { descripcion: `${formData.tipoVidrio || 'Vidrio Templado 6mm'}`, dimensiones: `${anchoMM}mm x ${altoMM}mm`, cantidad: 1, area: areaVidrio }
      ];
      areaTotal = parseFloat(areaVidrio);
      
      materialesAluminio = [
        { codigo: `${formData.tipoAluminio || 'S50'}-301`, descripcion: 'Marco Superior', longitud: `${anchoMM}mm`, cantidad: 1 },
        { codigo: `${formData.tipoAluminio || 'S50'}-302`, descripcion: 'Marco Inferior', longitud: `${anchoMM}mm`, cantidad: 1 },
        { codigo: `${formData.tipoAluminio || 'S50'}-303`, descripcion: 'Marco Lateral', longitud: `${altoMM}mm`, cantidad: 2 }
      ];
      optimizacion = {
        plancha1: [
          { dimensiones: `${anchoMM}mm x ${altoMM}mm`, cantidad: 1 }
        ],
        plancha2: [],
        desperdicio: 5.2
      };
    } else if (formData.tipoProyecto === 'puertaple') {
      const areaVidrio = (anchoMM * altoMM / 1000000).toFixed(2);
      const anchoPanel = Math.ceil(anchoMM / 3);
      materialesVidrio = [
        { descripcion: `${formData.tipoVidrio || 'Vidrio Templado 6mm'}`, dimensiones: `${anchoPanel}mm x ${altoMM}mm`, cantidad: 3, area: ((anchoPanel * altoMM / 1000000) * 3).toFixed(2) }
      ];
      areaTotal = parseFloat(areaVidrio);
      materialesAluminio = [
        { codigo: `${formData.tipoAluminio || 'S50'}-401`, descripcion: 'Riel Superior', longitud: `${anchoMM}mm`, cantidad: 1 },
        { codigo: `${formData.tipoAluminio || 'S50'}-402`, descripcion: 'Riel Inferior', longitud: `${anchoMM}mm`, cantidad: 1 },
        { codigo: `${formData.tipoAluminio || 'S50'}-403`, descripcion: 'Vertical Panel', longitud: `${altoMM}mm`, cantidad: 6 },
        { codigo: `${formData.tipoAluminio || 'S50'}-404`, descripcion: 'Horizontal Panel', longitud: `${anchoPanel}mm`, cantidad: 6 }
      ];
    }
    // Calcular longitud total de aluminio
    const longitudTotal = materialesAluminio.reduce((sum, item) => {
      // Extraer el valor numérico de la longitud (quitando 'mm' o 'm')
      const longValue = parseFloat(item.longitud);
      // Si la longitud contiene 'mm', convertir a metros
      const inMeters = item.longitud.includes('mm') ? longValue / 1000 : longValue;
      return sum + (inMeters * item.cantidad);
    }, 0).toFixed(1);
    setResultData({
      nombreProyecto: `${formData.tipoProyecto === 'ventana' ? 'Ventana Corrediza' : 
                       formData.tipoProyecto === 'puerta' ? 'Puerta Batiente' :
                       formData.tipoProyecto === 'mampara' ? 'Ventana Fija' :
                       formData.tipoProyecto === 'puertaple' ? 'Puerta Plegable' : 
                       'Proyecto'} ${anchoMM}mm x ${altoMM}mm`,
      tipoProyecto: formData.tipoProyecto,
      dimensiones: `${anchoMM}mm x ${altoMM}mm`,
      materialesVidrio,
      materialesAluminio,
      optimizacion,
      areaTotal: areaTotal.toFixed(2),
      desperdicio: (areaTotal * 0.085).toFixed(1), // Supongamos un 8.5% de desperdicio
      longitudTotal: longitudTotal + 'm'
    });
    setShowResults(true);
    setActiveTab('vidrio');
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="bg-gray-800 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Crear Nuevo Proyecto</h1>
        <p className="text-gray-400 mb-6">Ingrese los detalles del proyecto para generar una cotización</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="tipoProyecto" className="block text-gray-300 mb-2">Tipo de Proyecto</label>
              <div className="relative">
                <select 
                  id="tipoProyecto"
                  name="tipoProyecto"
                  value={formData.tipoProyecto}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="">Seleccione un tipo de proyecto</option>
                  <option value="ventana">Ventana Corrediza</option>
                  <option value="puerta">Puerta Batiente</option>
                  <option value="mampara">Ventana Fija</option>
                  <option value="puertaple">Puerta Plegable</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">El tipo de proyecto determinará los perfiles necesarios</p>
            </div>
            <div>
              <label htmlFor="cantidad" className="block text-gray-300 mb-2">Cantidad de Unidades</label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                min="1"
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">Número de unidades a fabricar</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {formData.dimensiones.map((dim, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-2">Ancho ({index + 1})</label>
                <input
                  type="text"
                  value={dim.ancho}
                  onChange={(e) => handleDimensionChange(index, 'ancho', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Alto ({index + 1})</label>
                <input
                  type="text"
                  value={dim.alto}
                  onChange={(e) => handleDimensionChange(index, 'alto', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                />
              </div>
            </div>
          ))}
            <div>
              <label htmlFor="unidadMedida" className="block text-gray-300 mb-2">Unidad de Medida</label>
              <div className="relative">
                <select
                  id="unidadMedida"
                  name="unidadMedida"
                  value={formData.unidadMedida}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none" >
                  <option value="mm">Metros cuadrados (m²)</option>
                  <option value="cm">Centímetros (cm)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
              <label htmlFor="tipoVidrio" className="block text-gray-300 mb-2">Tipo de Vidrio</label>
              <div className="relative">
                <select
                  id="tipoVidrio"
                  name="tipoVidrio"
                  value={formData.tipoVidrio}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Seleccione un tipo de vidrio</option>
                  <option value="templado6">Vidrio Templado 6mm</option>
                  <option value="templado8">Vidrio Templado 8mm</option>
                  <option value="laminado">Vidrio Laminado 6mm</option>
                  <option value="dobleAcristalamiento">Doble Acristalamiento 18mm</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">Tipo y espesor del vidrio a utilizar</p>
            </div>
            <div>
              <label htmlFor="tipoAluminio" className="block text-gray-300 mb-2">Tipo de Aluminio</label>
              <div className="relative">
                <select
                  id="tipoAluminio"
                  name="tipoAluminio"
                  value={formData.tipoAluminio}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="">Seleccione un tipo de aluminio</option>
                  <option value="schuco50">Aluminio Schüco 50</option>
                  <option value="exlabesaSerie500">Exlabesa Serie 500</option>
                  <option value="technalFrentePlano">Technal Frente Plano</option>
                  <option value="cortizo4200">Cortizo 4200</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">Perfilería a utilizar en el proyecto</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
              <label htmlFor="colorVidrio" className="block text-gray-300 mb-2">Color de Vidrio</label>
              <div className="relative">
                <select
                  id="colorVidrio"
                  name="colorVidrio"
                  value={formData.colorVidrio}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Seleccione un color de vidrio</option>
                  <option value="templado6">Reflejante Gris</option>
                  <option value="templado8">Reflejante Bronce</option>
                  <option value="laminado">Reflejante Incoloro</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="colorAluminio" className="block text-gray-300 mb-2">Color de Aluminio</label>
              <div className="relative">
                <select
                  id="colorAluminio"
                  name="colorAluminio"
                  value={formData.tipoAluminio}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="">Seleccione un color de aluminio</option>
                  <option value="schuco50">Blanco</option>
                  <option value="exlabesaSerie500">Negro</option>
                  <option value="technalFrentePlano">Gris</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
             <div>
              <label htmlFor="obra" className="block text-gray-300 mb-2">Mano de obra</label>
              <input
                type="number"
                id="obra"
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              Calcular Materiales
            </button>
          </div>
        </form>
        {showResults && (
          <div className="mt-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-1">Resultados: {resultData.nombreProyecto}</h2>
              <p className="text-gray-400 text-sm mb-4">Desglose detallado de materiales requeridos y optimización</p>       
              <div className="flex border-b border-gray-700">
                <button 
                  className={`px-4 py-2 ${activeTab === 'vidrio' ? 'text-white bg-gray-700 border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => handleTabChange('vidrio')}>
                  Vidrio
                </button>
                <button 
                  className={`px-4 py-2 ${activeTab === 'aluminio' ? 'text-white bg-gray-700 border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => handleTabChange('aluminio')}>
                  Aluminio
                </button>
                <button 
                  className={`px-4 py-2 ${activeTab === 'optimizacion' ? 'text-white bg-gray-700 border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => handleTabChange('optimizacion')}>
                  Optimización
                </button>
              </div>
              {activeTab === 'vidrio' && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm">
                        <th className="py-3 px-4 font-extrabold">Descripción</th>
                        <th className="py-3 px-4 font-extrabold">Dimensiones</th>
                        <th className="py-3 px-4 font-extrabold">Cantidad</th>
                        <th className="py-3 px-4 font-extrabold">Área</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultData.materialesVidrio.map((item, index) => (
                        <tr key={index} className="border-t border-gray-700 text-white">
                          <td className="py-3 px-4">{item.descripcion}</td>
                          <td className="py-3 px-4">{item.dimensiones}</td>
                          <td className="py-3 px-4">{item.cantidad}</td>
                          <td className="py-3 px-4">{item.area} m²</td>
                        </tr>
                      ))}
                      <tr className="border-t border-gray-700 font-medium text-white">
                        <td className="py-3 font-semibold px-4" colSpan="3">Área Total Utilizada</td>
                        <td className="py-3 font-semibold px-4">{resultData.areaTotal} m²</td>
                      </tr>
                      <tr className="border-t border-gray-700 text-white">
                        <td className="py-3 font-semibold px-4" colSpan="3">Desperdicio Estimado</td>
                        <td className="py-3 font-semibold px-4">{resultData.desperdicio}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'aluminio' && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm">
                        <th className="py-3 px-4 font-medium">Código</th>
                        <th className="py-3 px-4 font-medium">Descripción</th>
                        <th className="py-3 px-4 font-medium">Longitud</th>
                        <th className="py-3 px-4 font-medium">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultData.materialesAluminio.map((item, index) => (
                        <tr key={index} className="border-t border-gray-700 text-white">
                          <td className="py-3 px-4">{item.codigo}</td>
                          <td className="py-3 px-4">{item.descripcion}</td>
                          <td className="py-3 px-4">{item.longitud}</td>
                          <td className="py-3 px-4">{item.cantidad}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-gray-700 font-medium text-white">
                        <td className="py-3 font-semibold px-4" colSpan="3">Longitud Total</td>
                        <td className="py-3 font-semibold px-4">{resultData.longitudTotal}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'optimizacion' && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Optimización de Corte de Vidrio</h3>
                  <p className="text-gray-400 text-sm mb-4">Visualización de la distribución óptima para minimizar el desperdicio</p>
                  <div className="bg-gray-300 p-2 rounded relative">
                    <div className="flex mb-2">
                      <div className="relative mr-2 flex-1">
                        <div className="bg-blue-600 border-2 border-blue-800 rounded h-40 flex items-center justify-center text-yellow-200 text-sm">
                          1900mm x 900mm
                        </div>
                      </div>
                      <div className="relative mx-1 w-13">
                        <div className="bg-red-300 -py-4 border-2 border-red-500 border-dashed rounded h-40 w-full"></div>
                      </div>
                      <div className="relative ml-2 flex-1">
                        <div className="bg-blue-600 border-2 border-blue-800 rounded h-40 flex items-center justify-center text-yellow-200 text-sm">
                          1900mm x 900mm
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="relative mr-2 flex-1">
                        <div className="bg-blue-600 border-2 border-blue-800 rounded h-32 flex items-center justify-center text-yellow-200 text-sm">
                          1400mm x 900mm
                        </div>
                      </div>
                      <div className="relative mx-2 flex-1">
                        <div className="bg-blue-600 border-2 border-blue-800 rounded h-32 flex items-center justify-center text-yellow-200 text-sm">
                          1400mm x 900mm
                        </div>
                      </div>
                      <div className="relative ml-2 flex-1">
                        <div className="bg-blue-600 border-2 border-blue-800 rounded h-32 flex items-center justify-center text-yellow-200 text-sm">
                          900mm x 900mm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6 flex justify-end">               
                <button className="bg-blue-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Generar Cotización PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NuevoProyecto;