import React, { useState, useEffect } from 'react';
import { X, Upload, Check, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { CoverTheme, UserCategory } from '../types/community';
import { DisciplineType } from '../types/oab';
import { UserAvatar } from './UserIdentity';

const ALL_SPECIALTIES: DisciplineType[] = [
  'Ética Profissional',
  'Direito Constitucional',
  'Direito Administrativo',
  'Direito Tributário',
  'Direito Civil',
  'Direito Processual Civil',
  'Direito Penal',
  'Direito Processual Penal',
  'Direito do Trabalho',
  'Direito Processual do Trabalho',
  'Direito Empresarial',
  'Direito do Consumidor',
  'Direito Ambiental',
  'Direitos Humanos',
  'Direito Internacional',
  'Estatuto da Criança e do Adolescente (ECA)',
  'Filosofia do Direito',
];

const BRAZIL_UFS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
];

const COVER_OPTIONS: { id: CoverTheme; label: string; previewClass: string }[] = [
  { id: 'navy', label: 'Azul-Marinho Clássico', previewClass: 'bg-slate-900' },
  { id: 'slate', label: 'Grafite Forense', previewClass: 'bg-slate-700' },
  { id: 'amber', label: 'Âmbar Doutrinário', previewClass: 'bg-amber-800' },
  { id: 'emerald', label: 'Verde Advocacia', previewClass: 'bg-emerald-900' },
];

export function EditProfileModal() {
  const { currentUser, isEditProfileOpen, closeEditProfile, updateCurrentUserProfile } =
    useCommunity();

  const [name, setName] = useState(currentUser.name);
  const [handle, setHandle] = useState(currentUser.handle);
  const [roleTitle, setRoleTitle] = useState(currentUser.roleTitle);
  const [bio, setBio] = useState(currentUser.bio);
  const [category, setCategory] = useState<UserCategory>(currentUser.category);
  const [institution, setInstitution] = useState(currentUser.institution || '');
  const [semester, setSemester] = useState(currentUser.semester || '');
  const [targetExam, setTargetExam] = useState(currentUser.targetExam || '47º Exame da OAB');
  const [oabNumber, setOabNumber] = useState(currentUser.oabNumber || '');
  const [oabUf, setOabUf] = useState(currentUser.oabUf || 'RJ');
  const [specialties, setSpecialties] = useState<DisciplineType[]>(currentUser.specialties);
  const [coverTheme, setCoverTheme] = useState<CoverTheme>(currentUser.coverTheme);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(currentUser.avatarUrl);
  const [showPerformanceShowcase, setShowPerformanceShowcase] = useState<boolean>(
    currentUser.showPerformanceShowcase
  );

  useEffect(() => {
    if (isEditProfileOpen) {
      setName(currentUser.name);
      setHandle(currentUser.handle);
      setRoleTitle(currentUser.roleTitle);
      setBio(currentUser.bio);
      setCategory(currentUser.category);
      setInstitution(currentUser.institution || '');
      setSemester(currentUser.semester || '');
      setTargetExam(currentUser.targetExam || '47º Exame da OAB');
      setOabNumber(currentUser.oabNumber || '');
      setOabUf(currentUser.oabUf || 'RJ');
      setSpecialties(currentUser.specialties);
      setCoverTheme(currentUser.coverTheme);
      setAvatarUrl(currentUser.avatarUrl);
      setShowPerformanceShowcase(currentUser.showPerformanceShowcase);
    }
  }, [isEditProfileOpen, currentUser]);

  if (!isEditProfileOpen) return null;

  const toggleSpecialty = (disc: DisciplineType) => {
    setSpecialties((prev) =>
      prev.includes(disc) ? prev.filter((item) => item !== disc) : [...prev, disc]
    );
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedHandle = handle.replace(/^@+/, '').trim() || 'usuario.oab';
    const computedRole =
      roleTitle.trim() ||
      (category === 'advogado'
        ? `Advogado(a)${oabNumber ? ` · OAB/${oabUf} ${oabNumber}` : ''}`
        : category === 'examinando'
        ? `Bacharel / Examinando · ${targetExam || 'OAB'}`
        : `Estudante de Direito${semester ? ` · ${semester}` : ''}`);

    updateCurrentUserProfile({
      name: name.trim() || currentUser.name,
      handle: cleanedHandle,
      roleTitle: computedRole,
      bio: bio.trim(),
      category,
      institution: institution.trim() || undefined,
      semester: category === 'estudante' ? semester.trim() || undefined : undefined,
      targetExam: category !== 'advogado' ? targetExam.trim() || undefined : undefined,
      oabNumber: category === 'advogado' ? oabNumber.trim() || undefined : undefined,
      oabUf: category === 'advogado' ? oabUf : undefined,
      isVerified: category === 'advogado' && Boolean(oabNumber.trim()),
      specialties,
      coverTheme,
      avatarUrl,
      showPerformanceShowcase,
    });
    closeEditProfile();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Editar Perfil Profissional & Cadastro
            </h2>
            <p className="text-xs text-slate-500">
              Personalize suas credenciais jurídicas e áreas de interesse na comunidade Juris Tantum
            </p>
          </div>
          <button
            type="button"
            onClick={closeEditProfile}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          {/* Avatar & Cover Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <UserAvatar
              profile={{ ...currentUser, name, category, avatarUrl }}
              size="lg"
            />
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Alterar Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl(undefined)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:text-red-700 cursor-pointer"
                  >
                    Usar Iniciais
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-500">Capa discreta:</span>
                {COVER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCoverTheme(opt.id)}
                    title={opt.label}
                    className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                      opt.previewClass
                    } ${coverTheme === opt.id ? 'border-amber-500 scale-110' : 'border-white'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Basic Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">@usuario</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                  @
                </span>
                <input
                  type="text"
                  required
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.replace(/\s+/g, '.').toLowerCase())}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Category / Credential */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Selo de Categoria Profissional / Acadêmica
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(
                [
                  { id: 'estudante', label: 'Estudante de Direito', sub: 'Faculdade e Período' },
                  { id: 'examinando', label: 'Bacharel / Examinando', sub: 'Foco no Exame OAB' },
                  { id: 'advogado', label: 'Advogado(a)', sub: 'Registro OAB/UF' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    category === cat.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <div className="text-xs font-bold">{cat.label}</div>
                  <div
                    className={`text-[11px] mt-0.5 ${
                      category === cat.id ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    {cat.sub}
                  </div>
                </button>
              ))}
            </div>

            {/* Conditional fields by Category */}
            {category === 'estudante' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Instituição de Ensino
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Ex: UFRJ / USP / PUC"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Período Atual
                  </label>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="Ex: 9º Período"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>
            )}

            {category === 'examinando' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Exame Alvo
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-amber-600"
                  >
                    <option value="47º Exame da OAB">47º Exame da OAB</option>
                    <option value="48º Exame da OAB">48º Exame da OAB</option>
                    <option value="49º Exame da OAB">49º Exame da OAB</option>
                    <option value="2ª Fase OAB">2ª Fase OAB (Prático-Profissional)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Instituição de Formação (opcional)
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Ex: UERJ — Direito"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>
            )}

            {category === 'advogado' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Número da OAB (opcional — ativa selo verificado)
                  </label>
                  <input
                    type="text"
                    value={oabNumber}
                    onChange={(e) => setOabNumber(e.target.value)}
                    placeholder="Ex: 384.219"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Seccional (UF)
                  </label>
                  <select
                    value={oabUf}
                    onChange={(e) => setOabUf(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-amber-600"
                  >
                    {BRAZIL_UFS.map((uf) => (
                      <option key={uf} value={uf}>
                        OAB/{uf}
                      </option>
                    ))}
                  </select>
                </div>
                {oabNumber.trim() && (
                  <div className="sm:col-span-3 flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Selo visual de Advogado(a) Verificado(a) OAB/{oabUf} será exibido no seu perfil e comentários.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Role Title & Bio */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Título / Manchete Profissional
              </label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="Ex: Bacharel em Direito · Foco em Direito Tributário"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bio / Resumo Profissional
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Descreva sua trajetória acadêmica, áreas de interesse e objetivos no Exame de Ordem..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600"
              />
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Especialidades e Áreas de Interesse (clique para selecionar)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_SPECIALTIES.map((disc) => {
                const selected = specialties.includes(disc);
                return (
                  <button
                    key={disc}
                    type="button"
                    onClick={() => toggleSpecialty(disc)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      selected
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-400'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3" />}
                    <span>{disc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Privacy Toggle for Performance Showcase */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              {showPerformanceShowcase ? (
                <Eye className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <EyeOff className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Vitrine de Desempenho no Perfil Público
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Permitir que outros inscritos visualizem sua taxa média de acertos por disciplina e selos de aprovação.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowPerformanceShowcase(!showPerformanceShowcase)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer shrink-0 ${
                showPerformanceShowcase
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              {showPerformanceShowcase ? 'Pública' : 'Oculta'}
            </button>
          </div>

          {/* Footer Buttons */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeEditProfile}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
