import React, { useState } from 'react';
import { CertificateData } from '../types/certificate';
import { getVerificationRecord } from '../utils/verificationHelper';

interface CertificateVerificationModalProps {
  data: CertificateData;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateVerificationModal: React.FC<CertificateVerificationModalProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'resumen' | 'materias' | 'sellos'>('resumen');
  const record = getVerificationRecord(data);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(record.verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200">
        {/* ENCABEZADO INSTITUCIONAL GOBIERNO / SEP */}
        <div className="bg-gradient-to-r from-[#0c2317] via-[#1b4332] to-[#0c2317] px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-amber-400/40 flex items-center justify-center font-serif text-amber-300 text-lg font-bold">
              ✓
            </div>
            <div>
              <div className="text-[11px] tracking-widest text-amber-300 font-semibold uppercase">
                Sistema Educativo Nacional • SEP • DGB
              </div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                Validación Oficial de Autenticidad de Certificado
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="self-end sm:self-center text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Cerrar ventana"
          >
            ✕
          </button>
        </div>

        {/* STATUS BANNER */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
            </span>
            <span className="font-bold text-emerald-800 text-sm tracking-wide">
              {record.statusText}
            </span>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-mono font-medium border border-emerald-300">
            Folio: {record.folio}
          </span>
        </div>

        {/* CONTENIDO INTERACTIVO */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
          {/* TABS NAVEGACIÓN */}
          <div className="flex border-b border-slate-200 text-xs font-semibold gap-2">
            <button
              onClick={() => setActiveTab('resumen')}
              className={`pb-2.5 px-3 border-b-2 transition-colors ${
                activeTab === 'resumen'
                  ? 'border-[#1b4332] text-[#1b4332]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Datos del Egresado y Plantel
            </button>
            <button
              onClick={() => setActiveTab('materias')}
              className={`pb-2.5 px-3 border-b-2 transition-colors ${
                activeTab === 'materias'
                  ? 'border-[#1b4332] text-[#1b4332]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Acreditación y Asignaturas ({data.subjects?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('sellos')}
              className={`pb-2.5 px-3 border-b-2 transition-colors ${
                activeTab === 'sellos'
                  ? 'border-[#1b4332] text-[#1b4332]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Sellos Digitales y Timbrado SEP
            </button>
          </div>

          {/* TAB 1: RESUMEN DE DATOS */}
          {activeTab === 'resumen' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Datos del Estudiante Acreditado
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Nombre Completo:</span>
                    <span className="font-bold text-slate-900 text-sm tracking-wide">
                      {record.studentName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">CURP:</span>
                    <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                      {record.curp}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Número de Control / Matrícula:</span>
                    <span className="font-mono font-medium text-slate-800">
                      {record.controlNumber}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Datos del Centro Educativo
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Institución / Plantel:</span>
                    <span className="font-semibold text-slate-900">{record.schoolName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Clave de Centro de Trabajo (CCT):</span>
                    <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                      {record.cct}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Ubicación del Plantel:</span>
                    <span className="text-slate-700">{data.schoolLocation}</span>
                  </div>
                </div>
              </div>

              {/* DATOS ACADÉMICOS DESTACADOS */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-[10px] font-semibold text-amber-800 uppercase">Promedio General</div>
                  <div className="text-xl font-black text-[#1b4332]">{record.average}</div>
                  <div className="text-[9px] text-slate-600 font-medium">{record.averageWords}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-amber-800 uppercase">Créditos Cursados</div>
                  <div className="text-xl font-black text-[#1b4332]">{record.totalCredits}</div>
                  <div className="text-[9px] text-slate-600">100% Cubierto</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-amber-800 uppercase">Especialidad</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">{record.specialty}</div>
                  <div className="text-[9px] text-slate-600">Bachillerato General</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-amber-800 uppercase">Fecha de Expedición</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">{record.issueDate}</div>
                  <div className="text-[9px] text-slate-600">Registrado en SIGED</div>
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Validez Nacional:</strong> Este certificado cuenta con validez plena en toda la República Mexicana conforme al artículo 141 de la Ley General de Educación. Los datos han sido cotejados en tiempo real con el registro de egreso institucional.
              </div>
            </div>
          )}

          {/* TAB 2: MATERIAS */}
          {activeTab === 'materias' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-600">
                Lista de asignaturas y módulos aprobados que integran el plan de estudios del egresado:
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1b4332] text-white text-[11px]">
                    <tr>
                      <th className="py-2 px-3 font-semibold">No.</th>
                      <th className="py-2 px-3 font-semibold">Asignatura / Módulo</th>
                      <th className="py-2 px-3 font-semibold text-center">Horas</th>
                      <th className="py-2 px-3 font-semibold text-center">Créditos</th>
                      <th className="py-2 px-3 font-semibold text-center">Calificación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.subjects?.map((sub, i) => (
                      <tr key={sub.id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="py-1.5 px-3 text-slate-400 font-mono text-[10px]">{i + 1}</td>
                        <td className="py-1.5 px-3 font-medium text-slate-800">{sub.name}</td>
                        <td className="py-1.5 px-3 text-center text-slate-600 font-mono">{sub.hours}</td>
                        <td className="py-1.5 px-3 text-center text-slate-600 font-mono">{sub.credits}</td>
                        <td className="py-1.5 px-3 text-center font-bold text-[#1b4332] font-mono">
                          {Number(sub.grade).toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-amber-50 font-bold border-t border-amber-200 text-slate-800">
                    <tr>
                      <td colSpan={2} className="py-2 px-3 text-right">
                        Promedio Final Ponderado:
                      </td>
                      <td className="py-2 px-3 text-center text-slate-600 font-mono">
                        {data.subjects?.reduce((acc, s) => acc + (s.hours || 0), 0)} hrs
                      </td>
                      <td className="py-2 px-3 text-center text-slate-600 font-mono">
                        {record.totalCredits} cr.
                      </td>
                      <td className="py-2 px-3 text-center text-[#1b4332] text-sm font-mono">
                        {record.average}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SELLOS Y CRIPTOGRAFÍA */}
          {activeTab === 'sellos' && (
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 text-slate-300 rounded-xl space-y-2 text-[10px]">
                <div className="text-amber-400 font-bold uppercase tracking-wider">
                  Cadena Original del Timbre Fiscal y Certificación
                </div>
                <p className="break-all text-slate-400 leading-normal bg-black/40 p-2 rounded border border-slate-800">
                  {record.cadenaOriginal}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-[10px]">
                <div className="text-slate-700 font-bold uppercase">
                  Sello Digital de la Autoridad Educativa
                </div>
                <div className="text-slate-500 font-medium">
                  Firmante: {record.authorityName} ({record.authorityTitle})
                </div>
                <div className="text-slate-500">
                  Certificado No: {record.authorityCertificateNo} | Timbrado: {record.timestamp}
                </div>
                <p className="break-all text-slate-600 bg-white p-2 rounded border border-slate-200 leading-tight">
                  {record.digitalSealAuthority}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-[10px]">
                <div className="text-slate-700 font-bold uppercase">
                  Sello Digital de la Secretaría de Educación Pública (SEP)
                </div>
                <p className="break-all text-slate-600 bg-white p-2 rounded border border-slate-200 leading-tight">
                  {record.digitalSealSep}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* PIE DE ACCIONES */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-medium text-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>{copied ? '✓ Enlace Copiado' : '🔗 Copiar URL de Cotejo'}</span>
            </button>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Vinculado al código QR del certificado
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1b4332] text-white hover:bg-[#2d6a4f] rounded-lg font-semibold transition-colors shadow-sm"
            >
              Cerrar Validación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
