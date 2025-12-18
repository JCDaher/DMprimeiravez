// Variáveis globais
let currentSection = 1;
const totalSections = 4;
let prontuarioTexto = '';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateProgressBar();
});

// Configuração de event listeners
function setupEventListeners() {
    // Calcular idade automaticamente
    document.getElementById('dataNascimento').addEventListener('change', calcularIdade);

    // Calcular IMC automaticamente
    document.getElementById('peso').addEventListener('input', calcularIMC);
    document.getElementById('altura').addEventListener('input', calcularIMC);

    // Mostrar/ocultar campos condicionais
    document.querySelectorAll('input[name="monitorizacao"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('frequenciaMonitorizacao').style.display =
                this.value === 'Sim' ? 'block' : 'none';
        });
    });

    document.querySelectorAll('input[name="hipoglicemia"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('detalhesHipoglicemia').style.display =
                this.value === 'Sim' ? 'block' : 'none';
        });
    });

    document.querySelectorAll('input[name="internacoes"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('detalhesInternacoes').style.display =
                this.value === 'Sim' ? 'block' : 'none';
        });
    });

    document.querySelectorAll('input[name="tabagismo"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('detalhesTabagismo').style.display =
                this.value === 'Fumante' || this.value === 'Ex-fumante' ? 'block' : 'none';
        });
    });

    document.querySelectorAll('input[name="etilismo"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('detalhesEtilismo').style.display =
                this.value !== 'Não' ? 'block' : 'none';
        });
    });

    // Submit do formulário
    document.getElementById('consultaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        gerarProntuario();
    });
}

// Funções de cálculo
function calcularIdade() {
    const dataNasc = new Date(document.getElementById('dataNascimento').value);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }

    document.getElementById('idade').value = idade;
}

function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value) / 100; // converter cm para m

    if (peso && altura) {
        const imc = (peso / (altura * altura)).toFixed(1);
        document.getElementById('imc').value = imc;
    }
}

// Navegação entre seções
function nextSection() {
    if (validateCurrentSection()) {
        if (currentSection < totalSections) {
            document.querySelector(`[data-section="${currentSection}"]`).classList.remove('active');
            currentSection++;
            document.querySelector(`[data-section="${currentSection}"]`).classList.add('active');
            updateProgressBar();
            window.scrollTo(0, 0);
        }
    }
}

function prevSection() {
    if (currentSection > 1) {
        document.querySelector(`[data-section="${currentSection}"]`).classList.remove('active');
        currentSection--;
        document.querySelector(`[data-section="${currentSection}"]`).classList.add('active');
        updateProgressBar();
        window.scrollTo(0, 0);
    }
}

function updateProgressBar() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber < currentSection) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentSection) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Validação
function validateCurrentSection() {
    const currentSectionElement = document.querySelector(`[data-section="${currentSection}"]`);
    const requiredFields = currentSectionElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });

    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }

    return isValid;
}

// Funções auxiliares para obter valores
function getCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value).join(', ');
}

function getRadioValue(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : '';
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Gerar prontuário
function gerarProntuario() {
    const dataConsulta = new Date().toLocaleDateString('pt-BR');
    const horaConsulta = new Date().toLocaleTimeString('pt-BR');

    prontuarioTexto = `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    PRONTUÁRIO MÉDICO - PRIMEIRA CONSULTA                      ║
║                           Dr. Jorge Cecílio                                    ║
╚═══════════════════════════════════════════════════════════════════════════════╝

Data da Consulta: ${dataConsulta} às ${horaConsulta}

═══════════════════════════════════════════════════════════════════════════════
1. IDENTIFICAÇÃO E DADOS DEMOGRÁFICOS
═══════════════════════════════════════════════════════════════════════════════

Nome: ${getValue('nome')}
Data de Nascimento: ${formatDate(getValue('dataNascimento'))}
Idade: ${getValue('idade')} anos
Sexo: ${getValue('sexo')}
CPF: ${getValue('cpf')}
RG: ${getValue('rg')}

Endereço: ${getValue('endereco')}
Telefone: ${getValue('telefone')}
E-mail: ${getValue('email')}

Profissão: ${getValue('profissao')}
Estado Civil: ${getValue('estadoCivil')}

═══════════════════════════════════════════════════════════════════════════════
2. HISTÓRIA CLÍNICA
═══════════════════════════════════════════════════════════════════════════════

2.1 QUEIXA PRINCIPAL E HDA
─────────────────────────────────────────────────────────────────────────────

Queixa Principal:
${getValue('queixaPrincipal')}

História da Doença Atual:
${getValue('hda')}

2.2 HISTÓRIA DA DIABETES
─────────────────────────────────────────────────────────────────────────────

Tipo de Diabetes: ${getValue('tipoDiabetes')}
Anos desde o Diagnóstico: ${getValue('anosDiagnostico')}
Idade ao Diagnóstico: ${getValue('idadeDiagnostico')}

Circunstância do Diagnóstico:
${getValue('circunstanciaDiagnostico')}

Tratamentos: ${getCheckboxValues('tratamento')}

Medicamentos Atuais:
${getValue('medicamentosAtuais')}

Controle Glicêmico Atual: ${getValue('controleGlicemico')}
Realiza Monitorização: ${getRadioValue('monitorizacao')}
${getRadioValue('monitorizacao') === 'Sim' ? 'Frequência: ' + getValue('frequenciaGlicemia') : ''}

Episódios de Hipoglicemia: ${getRadioValue('hipoglicemia')}
${getRadioValue('hipoglicemia') === 'Sim' ? getValue('frequenciaHipoglicemia') : ''}

Internações Prévias: ${getRadioValue('internacoes')}
${getRadioValue('internacoes') === 'Sim' ? getValue('motivoInternacoes') : ''}

2.3 COMORBIDADES E ANTECEDENTES
─────────────────────────────────────────────────────────────────────────────

Comorbidades: ${getCheckboxValues('comorbidade')}
${getValue('outrasComorbidades') ? 'Outras: ' + getValue('outrasComorbidades') : ''}

Cirurgias Prévias:
${getValue('cirurgiasPrevias')}

Alergias Medicamentosas:
${getValue('alergias')}

Outros Medicamentos em Uso:
${getValue('outrosMedicamentos')}

2.4 HISTÓRICO FAMILIAR
─────────────────────────────────────────────────────────────────────────────

Diabetes em Familiares: ${getCheckboxValues('familiarDM')}
Outras Doenças Familiares: ${getCheckboxValues('familiarOutras')}

Detalhes do Histórico Familiar:
${getValue('detalhesHistoricoFamiliar')}

2.5 HÁBITOS DE VIDA
─────────────────────────────────────────────────────────────────────────────

Padrão Alimentar:
${getValue('alimentacao')}

Acompanhamento Nutricional: ${getRadioValue('nutricionista')}

Atividade Física: ${getRadioValue('atividadeFisica')}
${getValue('detalhesAtividade') ? 'Detalhes: ' + getValue('detalhesAtividade') : ''}

Tabagismo: ${getRadioValue('tabagismo')}
${getValue('cargaTabagica') ? 'Carga Tabágica: ' + getValue('cargaTabagica') : ''}

Etilismo: ${getRadioValue('etilismo')}
${getValue('frequenciaAlcool') ? 'Detalhes: ' + getValue('frequenciaAlcool') : ''}

Padrão de Sono: ${getValue('sono')}
Nível de Estresse/Ansiedade: ${getRadioValue('estresse')}

2.6 AVALIAÇÃO DE COMPLICAÇÕES CRÔNICAS
─────────────────────────────────────────────────────────────────────────────

Sintomas Visuais: ${getCheckboxValues('sintomasVisuais')}
Última Consulta Oftalmológica: ${getValue('ultimoOftalmo')}

Sintomas Renais: ${getCheckboxValues('sintomasRenais')}

Sintomas Neurológicos: ${getCheckboxValues('sintomasNeuro')}

Sintomas Cardiovasculares: ${getCheckboxValues('sintomasCardio')}

Sintomas Gastrointestinais: ${getCheckboxValues('sintomasGastro')}

Sintomas Geniturinários: ${getCheckboxValues('sintomasGenito')}

Problemas nos Pés: ${getCheckboxValues('sintomasPes')}

═══════════════════════════════════════════════════════════════════════════════
3. EXAME FÍSICO
═══════════════════════════════════════════════════════════════════════════════

3.1 SINAIS VITAIS E ANTROPOMETRIA
─────────────────────────────────────────────────────────────────────────────

Peso: ${getValue('peso')} kg
Altura: ${getValue('altura')} cm
IMC: ${getValue('imc')} kg/m²
Circunferência Abdominal: ${getValue('circunferenciaAbdominal')} cm
Circunferência do Pescoço: ${getValue('circunferenciaPescoço')} cm

PA Sentado: ${getValue('pasSentado')} mmHg
PA Deitado: ${getValue('pasDeitado')} mmHg
PA em Pé: ${getValue('pasPe')} mmHg

Frequência Cardíaca: ${getValue('fc')} bpm
Frequência Respiratória: ${getValue('fr')} irpm
Temperatura: ${getValue('temperatura')} °C
SpO2: ${getValue('spo2')}%

3.2 EXAME GERAL
─────────────────────────────────────────────────────────────────────────────

Estado Geral: ${getValue('estadoGeral')}
Características: ${getCheckboxValues('caracteristicasGerais')}

Exame da Pele:
${getValue('pele')}

3.3 EXAME CARDIOVASCULAR
─────────────────────────────────────────────────────────────────────────────

Pulsos Periféricos:
${getValue('examePulsos')}

Ausculta Cardíaca:
${getValue('ausculta')}

Exame Vascular:
${getValue('exameVascular')}

3.4 EXAME NEUROLÓGICO
─────────────────────────────────────────────────────────────────────────────

Reflexos:
${getValue('reflexos')}

Sensibilidade:
${getValue('sensibilidade')}

Força Muscular: ${getValue('forca')}

3.5 EXAME DOS PÉS
─────────────────────────────────────────────────────────────────────────────

Inspeção dos Pés:
${getValue('inspecaoPes')}

Classificação de Risco - Pé Diabético: ${getValue('classificacaoPeDiabetico')}

3.6 OUTROS SISTEMAS
─────────────────────────────────────────────────────────────────────────────

Aparelho Respiratório:
${getValue('aparelhoRespiratorio')}

Abdome:
${getValue('abdome')}

Outros Achados:
${getValue('outrosAchados')}

═══════════════════════════════════════════════════════════════════════════════
4. EXAMES COMPLEMENTARES
═══════════════════════════════════════════════════════════════════════════════

4.1 EXAMES LABORATORIAIS
─────────────────────────────────────────────────────────────────────────────

Glicemia de Jejum: ${getValue('glicemiaJejum')} mg/dL (${formatDate(getValue('dataGlicemia'))})
HbA1c: ${getValue('hba1c')}% (${formatDate(getValue('dataHba1c'))})

Perfil Lipídico (${formatDate(getValue('dataLipidograma'))}):
  - Colesterol Total: ${getValue('colesterolTotal')} mg/dL
  - HDL: ${getValue('hdl')} mg/dL
  - LDL: ${getValue('ldl')} mg/dL
  - Triglicérides: ${getValue('triglicerides')} mg/dL

Função Renal:
  - Creatinina: ${getValue('creatinina')} mg/dL
  - TFG: ${getValue('tfg')} mL/min
  - Ureia: ${getValue('ureia')} mg/dL
  - Albuminúria: ${getValue('albuminuria')} mg/g (${formatDate(getValue('dataAlbuminuria'))})

Função Hepática:
  - TGO/AST: ${getValue('tgo')} U/L
  - TGP/ALT: ${getValue('tgp')} U/L
  - GGT: ${getValue('ggt')} U/L

Função Tireoidiana:
  - TSH: ${getValue('tsh')} μUI/mL
  - T4 livre: ${getValue('t4livre')} ng/dL

Outros Exames:
${getValue('outrosExames')}

4.2 EXAMES DE IMAGEM E ESPECIALIZADOS
─────────────────────────────────────────────────────────────────────────────

Eletrocardiograma:
${getValue('ecg')}

Fundoscopia/Mapeamento de Retina:
${getValue('fundoscopia')}

Ecocardiograma:
${getValue('ecocardiograma')}

Doppler de MMII:
${getValue('dopplerMMII')}

Outros Exames:
${getValue('outrosExamesImagem')}

═══════════════════════════════════════════════════════════════════════════════
5. AVALIAÇÃO E DIAGNÓSTICO
═══════════════════════════════════════════════════════════════════════════════

DIAGNÓSTICO PRINCIPAL:
${getValue('diagnosticoPrincipal')}

DIAGNÓSTICOS SECUNDÁRIOS:
${getValue('diagnosticosSecundarios')}

CLASSIFICAÇÃO DO CONTROLE GLICÊMICO:
${getValue('classificacaoControle')}

COMPLICAÇÕES PRESENTES:
${getCheckboxValues('complicacoes')}

ESTADIAMENTO DAS COMPLICAÇÕES:
${getValue('estadiamentoComplicacoes')}

═══════════════════════════════════════════════════════════════════════════════
6. PLANO TERAPÊUTICO
═══════════════════════════════════════════════════════════════════════════════

6.1 METAS GLICÊMICAS INDIVIDUALIZADAS
─────────────────────────────────────────────────────────────────────────────

${getValue('metasGlicemicas')}

6.2 PLANO MEDICAMENTOSO
─────────────────────────────────────────────────────────────────────────────

${getValue('planoMedicamentoso')}

6.3 ORIENTAÇÕES DIETÉTICAS
─────────────────────────────────────────────────────────────────────────────

${getValue('orientacoesDieta')}

6.4 ORIENTAÇÕES SOBRE ATIVIDADE FÍSICA
─────────────────────────────────────────────────────────────────────────────

${getValue('orientacoesAtividade')}

6.5 PLANO DE AUTOMONITORAMENTO
─────────────────────────────────────────────────────────────────────────────

${getValue('automonitoramento')}

6.6 EDUCAÇÃO EM DIABETES
─────────────────────────────────────────────────────────────────────────────

${getValue('educacaoDiabetes')}

6.7 EXAMES SOLICITADOS
─────────────────────────────────────────────────────────────────────────────

${getValue('examesSolicitados')}

6.8 ENCAMINHAMENTOS
─────────────────────────────────────────────────────────────────────────────

${getValue('encaminhamentos')}

6.9 VACINAÇÃO
─────────────────────────────────────────────────────────────────────────────

${getValue('vacinacao')}

═══════════════════════════════════════════════════════════════════════════════
RETORNO
═══════════════════════════════════════════════════════════════════════════════

${getValue('retorno')}

OBSERVAÇÕES ADICIONAIS:
${getValue('observacoes')}

═══════════════════════════════════════════════════════════════════════════════

                              Dr. Jorge Cecílio
                         CRM: ___________________
                    Endocrinologia e Metabolismo

═══════════════════════════════════════════════════════════════════════════════
`;

    // Mostrar resultado
    document.getElementById('prontuarioGerado').textContent = prontuarioTexto;
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('consultaForm').style.display = 'none';
    document.querySelector('.progress-bar').style.display = 'none';
    window.scrollTo(0, 0);
}

// Funções de exportação
function exportarTexto() {
    const blob = new Blob([prontuarioTexto], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const nomeArquivo = `Prontuario_${getValue('nome').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    link.download = nomeArquivo;
    link.click();
}

function exportarMarkdown() {
    const markdownTexto = prontuarioTexto
        .replace(/╔═+╗/g, '# ')
        .replace(/║/g, '')
        .replace(/╚═+╝/g, '')
        .replace(/═+/g, '---')
        .replace(/─+/g, '');

    const blob = new Blob([markdownTexto], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const nomeArquivo = `Prontuario_${getValue('nome').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.md`;
    link.download = nomeArquivo;
    link.click();
}

function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;

    doc.setFont('courier');
    doc.setFontSize(8);

    const lines = doc.splitTextToSize(prontuarioTexto, maxWidth);
    let y = margin;

    lines.forEach((line, index) => {
        if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
        doc.text(line, margin, y);
        y += 5;
    });

    const nomeArquivo = `Prontuario_${getValue('nome').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(nomeArquivo);
}

function copiarTexto() {
    navigator.clipboard.writeText(prontuarioTexto).then(() => {
        alert('Prontuário copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar o texto. Por favor, tente novamente.');
    });
}

function novaConsulta() {
    if (confirm('Deseja iniciar uma nova consulta? Todos os dados atuais serão perdidos.')) {
        location.reload();
    }
}
