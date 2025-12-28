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
    return element ? element.value.trim() : '';
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Função auxiliar para adicionar linha apenas se houver valor
function addLine(label, value, suffix = '') {
    if (value) {
        return `${label}: ${value}${suffix}\n`;
    }
    return '';
}

// Função auxiliar para adicionar bloco de texto
function addBlock(label, value) {
    if (value) {
        return `${label}:\n${value}\n\n`;
    }
    return '';
}

// Gerar prontuário
function gerarProntuario() {
    const dataConsulta = new Date().toLocaleDateString('pt-BR');
    const horaConsulta = new Date().toLocaleTimeString('pt-BR');

    let prontuario = '';

    // Cabeçalho
    prontuario += `╔═══════════════════════════════════════════════════════════════════════════════╗\n`;
    prontuario += `║                    PRONTUÁRIO MÉDICO - PRIMEIRA CONSULTA                      ║\n`;
    prontuario += `║                           Dr. Jorge Cecílio                                    ║\n`;
    prontuario += `╚═══════════════════════════════════════════════════════════════════════════════╝\n\n`;
    prontuario += `Data da Consulta: ${dataConsulta} às ${horaConsulta}\n\n`;

    // 1. IDENTIFICAÇÃO
    let secaoId = '';
    secaoId += addLine('Nome', getValue('nome'));
    secaoId += addLine('Data de Nascimento', formatDate(getValue('dataNascimento')));
    secaoId += addLine('Idade', getValue('idade'), ' anos');
    secaoId += addLine('Sexo', getValue('sexo'));
    secaoId += addLine('CPF', getValue('cpf'));
    secaoId += addLine('RG', getValue('rg'));
    secaoId += addLine('Endereço', getValue('endereco'));
    secaoId += addLine('Telefone', getValue('telefone'));
    secaoId += addLine('E-mail', getValue('email'));
    secaoId += addLine('Profissão', getValue('profissao'));
    secaoId += addLine('Estado Civil', getValue('estadoCivil'));

    if (secaoId) {
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n`;
        prontuario += `1. IDENTIFICAÇÃO E DADOS DEMOGRÁFICOS\n`;
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n\n`;
        prontuario += secaoId + '\n';
    }

    // 2. HISTÓRIA CLÍNICA
    let secaoHist = '';

    // 2.1 Queixa Principal e HDA
    let subsec21 = '';
    subsec21 += addBlock('Queixa Principal', getValue('queixaPrincipal'));
    subsec21 += addBlock('História da Doença Atual', getValue('hda'));

    if (subsec21) {
        secaoHist += `2.1 QUEIXA PRINCIPAL E HDA\n`;
        secaoHist += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoHist += subsec21;
    }

    // 2.2 História da Diabetes
    let subsec22 = '';
    subsec22 += addLine('Tipo de Diabetes', getValue('tipoDiabetes'));
    subsec22 += addLine('Anos desde o Diagnóstico', getValue('anosDiagnostico'));
    subsec22 += addLine('Idade ao Diagnóstico', getValue('idadeDiagnostico'));
    subsec22 += addBlock('Circunstância do Diagnóstico', getValue('circunstanciaDiagnostico'));
    subsec22 += addLine('Tratamentos', getCheckboxValues('tratamento'));
    subsec22 += addBlock('Medicamentos Atuais', getValue('medicamentosAtuais'));
    subsec22 += addLine('Controle Glicêmico Atual', getValue('controleGlicemico'));
    subsec22 += addLine('Realiza Monitorização', getRadioValue('monitorizacao'));
    if (getRadioValue('monitorizacao') === 'Sim') {
        subsec22 += addLine('Frequência da Monitorização', getValue('frequenciaGlicemia'));
    }
    subsec22 += addLine('Episódios de Hipoglicemia', getRadioValue('hipoglicemia'));
    if (getRadioValue('hipoglicemia') === 'Sim') {
        subsec22 += addBlock('Detalhes das Hipoglicemias', getValue('frequenciaHipoglicemia'));
    }
    subsec22 += addLine('Internações Prévias por Diabetes', getRadioValue('internacoes'));
    if (getRadioValue('internacoes') === 'Sim') {
        subsec22 += addBlock('Motivo das Internações', getValue('motivoInternacoes'));
    }

    if (subsec22) {
        secaoHist += `2.2 HISTÓRIA DA DIABETES\n`;
        secaoHist += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoHist += subsec22;
    }

    // 2.3 Comorbidades
    let subsec23 = '';
    subsec23 += addLine('Comorbidades', getCheckboxValues('comorbidade'));
    subsec23 += addBlock('Outras Comorbidades', getValue('outrasComorbidades'));
    subsec23 += addBlock('Cirurgias Prévias', getValue('cirurgiasPrevias'));
    subsec23 += addBlock('Alergias Medicamentosas', getValue('alergias'));
    subsec23 += addBlock('Outros Medicamentos em Uso', getValue('outrosMedicamentos'));

    if (subsec23) {
        secaoHist += `2.3 COMORBIDADES E ANTECEDENTES\n`;
        secaoHist += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoHist += subsec23;
    }

    // 2.4 Histórico Familiar
    let subsec24 = '';
    subsec24 += addLine('Diabetes em Familiares', getCheckboxValues('familiarDM'));
    subsec24 += addLine('Outras Doenças Familiares', getCheckboxValues('familiarOutras'));
    subsec24 += addBlock('Detalhes do Histórico Familiar', getValue('detalhesHistoricoFamiliar'));

    if (subsec24) {
        secaoHist += `2.4 HISTÓRICO FAMILIAR\n`;
        secaoHist += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoHist += subsec24;
    }

    // 2.5 Hábitos de Vida
    let subsec25 = '';
    subsec25 += addBlock('Padrão Alimentar', getValue('alimentacao'));
    subsec25 += addLine('Acompanhamento Nutricional', getRadioValue('nutricionista'));
    subsec25 += addLine('Atividade Física', getRadioValue('atividadeFisica'));
    if (getValue('detalhesAtividade')) {
        subsec25 += addLine('Detalhes da Atividade Física', getValue('detalhesAtividade'));
    }
    subsec25 += addLine('Tabagismo', getRadioValue('tabagismo'));
    if (getValue('cargaTabagica')) {
        subsec25 += addLine('Carga Tabágica', getValue('cargaTabagica'));
    }
    subsec25 += addLine('Etilismo', getRadioValue('etilismo'));
    if (getValue('frequenciaAlcool')) {
        subsec25 += addLine('Frequência e Quantidade de Álcool', getValue('frequenciaAlcool'));
    }
    subsec25 += addLine('Padrão de Sono', getValue('sono'));
    subsec25 += addLine('Nível de Estresse/Ansiedade', getRadioValue('estresse'));

    if (subsec25) {
        secaoHist += `2.5 HÁBITOS DE VIDA\n`;
        secaoHist += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoHist += subsec25;
    }

    // 2.6 Avaliação de Complicações
    let subsec26 = '';
    subsec26 += addLine('Sintomas Visuais', getCheckboxValues('sintomasVisuais'));
    subsec26 += addLine('Última Consulta Oftalmológica', getValue('ultimoOftalmo'));
    subsec26 += addLine('Sintomas Renais', getCheckboxValues('sintomasRenais'));
    subsec26 += addLine('Sintomas Neurológicos', getCheckboxValues('sintomasNeuro'));
    subsec26 += addLine('Sintomas Cardiovasculares', getCheckboxValues('sintomasCardio'));
    subsec26 += addLine('Sintomas Gastrointestinais', getCheckboxValues('sintomasGastro'));
    subsec26 += addLine('Sintomas Geniturinários', getCheckboxValues('sintomasGenito'));
    subsec26 += addLine('Problemas nos Pés', getCheckboxValues('sintomasPes'));

    if (subsec26) {
        secaoHist += `2.6 AVALIAÇÃO DE COMPLICAÇÕES CRÔNICAS\n`;
        secaoHist += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoHist += subsec26;
    }

    if (secaoHist) {
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n`;
        prontuario += `2. HISTÓRIA CLÍNICA\n`;
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n\n`;
        prontuario += secaoHist;
    }

    // 3. EXAME FÍSICO
    let secaoExame = '';

    // 3.1 Sinais Vitais
    let subsec31 = '';
    subsec31 += addLine('Peso', getValue('peso'), ' kg');
    subsec31 += addLine('Altura', getValue('altura'), ' cm');
    subsec31 += addLine('IMC', getValue('imc'), ' kg/m²');
    subsec31 += addLine('Circunferência Abdominal', getValue('circunferenciaAbdominal'), ' cm');
    subsec31 += addLine('Circunferência do Pescoço', getValue('circunferenciaPescoço'), ' cm');
    subsec31 += addLine('PA Sentado', getValue('pasSentado'), ' mmHg');
    subsec31 += addLine('PA Deitado', getValue('pasDeitado'), ' mmHg');
    subsec31 += addLine('PA em Pé', getValue('pasPe'), ' mmHg');
    subsec31 += addLine('Frequência Cardíaca', getValue('fc'), ' bpm');
    subsec31 += addLine('Frequência Respiratória', getValue('fr'), ' irpm');
    subsec31 += addLine('Temperatura', getValue('temperatura'), ' °C');
    subsec31 += addLine('SpO2', getValue('spo2'), '%');

    if (subsec31) {
        secaoExame += `3.1 SINAIS VITAIS E ANTROPOMETRIA\n`;
        secaoExame += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoExame += subsec31 + '\n';
    }

    // 3.2 Exame Geral
    let subsec32 = '';
    subsec32 += addLine('Estado Geral', getValue('estadoGeral'));
    subsec32 += addLine('Características', getCheckboxValues('caracteristicasGerais'));
    subsec32 += addBlock('Exame da Pele', getValue('pele'));

    if (subsec32) {
        secaoExame += `3.2 EXAME GERAL\n`;
        secaoExame += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoExame += subsec32;
    }

    // 3.3 Exame Cardiovascular
    let subsec33 = '';
    subsec33 += addBlock('Pulsos Periféricos', getValue('examePulsos'));
    subsec33 += addBlock('Ausculta Cardíaca', getValue('ausculta'));
    subsec33 += addBlock('Exame Vascular', getValue('exameVascular'));

    if (subsec33) {
        secaoExame += `3.3 EXAME CARDIOVASCULAR\n`;
        secaoExame += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoExame += subsec33;
    }

    // 3.4 Exame Neurológico
    let subsec34 = '';
    subsec34 += addBlock('Reflexos', getValue('reflexos'));
    subsec34 += addBlock('Sensibilidade', getValue('sensibilidade'));
    subsec34 += addLine('Força Muscular', getValue('forca'));

    if (subsec34) {
        secaoExame += `3.4 EXAME NEUROLÓGICO\n`;
        secaoExame += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoExame += subsec34;
    }

    // 3.5 Exame dos Pés
    let subsec35 = '';
    subsec35 += addBlock('Inspeção dos Pés', getValue('inspecaoPes'));
    subsec35 += addLine('Classificação de Risco - Pé Diabético', getValue('classificacaoPeDiabetico'));

    if (subsec35) {
        secaoExame += `3.5 EXAME DOS PÉS\n`;
        secaoExame += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoExame += subsec35;
    }

    // 3.6 Outros Sistemas
    let subsec36 = '';
    subsec36 += addBlock('Aparelho Respiratório', getValue('aparelhoRespiratorio'));
    subsec36 += addBlock('Abdome', getValue('abdome'));
    subsec36 += addBlock('Outros Achados', getValue('outrosAchados'));

    if (subsec36) {
        secaoExame += `3.6 OUTROS SISTEMAS\n`;
        secaoExame += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoExame += subsec36;
    }

    if (secaoExame) {
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n`;
        prontuario += `3. EXAME FÍSICO\n`;
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n\n`;
        prontuario += secaoExame;
    }

    // 4. EXAMES COMPLEMENTARES
    let secaoLab = '';

    // 4.1 Exames Laboratoriais
    let subsec41 = '';
    if (getValue('glicemiaJejum')) {
        subsec41 += addLine('Glicemia de Jejum', getValue('glicemiaJejum') + ' mg/dL' + (formatDate(getValue('dataGlicemia')) ? ' (' + formatDate(getValue('dataGlicemia')) + ')' : ''));
    }
    if (getValue('hba1c')) {
        subsec41 += addLine('HbA1c', getValue('hba1c') + '%' + (formatDate(getValue('dataHba1c')) ? ' (' + formatDate(getValue('dataHba1c')) + ')' : ''));
    }

    // Perfil Lipídico
    let lipidico = '';
    if (getValue('colesterolTotal')) lipidico += `  - Colesterol Total: ${getValue('colesterolTotal')} mg/dL\n`;
    if (getValue('hdl')) lipidico += `  - HDL: ${getValue('hdl')} mg/dL\n`;
    if (getValue('ldl')) lipidico += `  - LDL: ${getValue('ldl')} mg/dL\n`;
    if (getValue('triglicerides')) lipidico += `  - Triglicérides: ${getValue('triglicerides')} mg/dL\n`;
    if (lipidico) {
        subsec41 += `\nPerfil Lipídico${formatDate(getValue('dataLipidograma')) ? ' (' + formatDate(getValue('dataLipidograma')) + ')' : ''}:\n${lipidico}`;
    }

    // Função Renal
    let renal = '';
    if (getValue('creatinina')) renal += `  - Creatinina: ${getValue('creatinina')} mg/dL\n`;
    if (getValue('tfg')) renal += `  - TFG: ${getValue('tfg')} mL/min\n`;
    if (getValue('ureia')) renal += `  - Ureia: ${getValue('ureia')} mg/dL\n`;
    if (getValue('albuminuria')) {
        renal += `  - Albuminúria: ${getValue('albuminuria')} mg/g${formatDate(getValue('dataAlbuminuria')) ? ' (' + formatDate(getValue('dataAlbuminuria')) + ')' : ''}\n`;
    }
    if (renal) {
        subsec41 += `\nFunção Renal:\n${renal}`;
    }

    // Função Hepática
    let hepatica = '';
    if (getValue('tgo')) hepatica += `  - TGO/AST: ${getValue('tgo')} U/L\n`;
    if (getValue('tgp')) hepatica += `  - TGP/ALT: ${getValue('tgp')} U/L\n`;
    if (getValue('ggt')) hepatica += `  - GGT: ${getValue('ggt')} U/L\n`;
    if (hepatica) {
        subsec41 += `\nFunção Hepática:\n${hepatica}`;
    }

    // Função Tireoidiana
    let tireoide = '';
    if (getValue('tsh')) tireoide += `  - TSH: ${getValue('tsh')} μUI/mL\n`;
    if (getValue('t4livre')) tireoide += `  - T4 livre: ${getValue('t4livre')} ng/dL\n`;
    if (tireoide) {
        subsec41 += `\nFunção Tireoidiana:\n${tireoide}`;
    }

    subsec41 += addBlock('\nOutros Exames', getValue('outrosExames'));

    if (subsec41) {
        secaoLab += `4.1 EXAMES LABORATORIAIS\n`;
        secaoLab += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoLab += subsec41;
    }

    // 4.2 Exames de Imagem
    let subsec42 = '';
    subsec42 += addBlock('Eletrocardiograma', getValue('ecg'));
    subsec42 += addBlock('Fundoscopia/Mapeamento de Retina', getValue('fundoscopia'));
    subsec42 += addBlock('Ecocardiograma', getValue('ecocardiograma'));
    subsec42 += addBlock('Doppler de MMII', getValue('dopplerMMII'));
    subsec42 += addBlock('Outros Exames de Imagem/Especializados', getValue('outrosExamesImagem'));

    if (subsec42) {
        secaoLab += `4.2 EXAMES DE IMAGEM E ESPECIALIZADOS\n`;
        secaoLab += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoLab += subsec42;
    }

    if (secaoLab) {
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n`;
        prontuario += `4. EXAMES COMPLEMENTARES\n`;
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n\n`;
        prontuario += secaoLab;
    }

    // 5. AVALIAÇÃO E DIAGNÓSTICO
    let secaoAval = '';
    secaoAval += addBlock('DIAGNÓSTICO PRINCIPAL', getValue('diagnosticoPrincipal'));
    secaoAval += addBlock('DIAGNÓSTICOS SECUNDÁRIOS', getValue('diagnosticosSecundarios'));
    secaoAval += addLine('CLASSIFICAÇÃO DO CONTROLE GLICÊMICO', getValue('classificacaoControle'));
    secaoAval += addLine('COMPLICAÇÕES PRESENTES', getCheckboxValues('complicacoes'));
    secaoAval += addBlock('ESTADIAMENTO DAS COMPLICAÇÕES', getValue('estadiamentoComplicacoes'));

    if (secaoAval) {
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n`;
        prontuario += `5. AVALIAÇÃO E DIAGNÓSTICO\n`;
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n\n`;
        prontuario += secaoAval;
    }

    // 6. PLANO TERAPÊUTICO
    let secaoPlano = '';
    if (getValue('metasGlicemicas')) {
        secaoPlano += `6.1 METAS GLICÊMICAS INDIVIDUALIZADAS\n`;
        secaoPlano += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoPlano += getValue('metasGlicemicas') + '\n\n';
    }
    if (getValue('planoMedicamentoso')) {
        secaoPlano += `6.2 PLANO MEDICAMENTOSO\n`;
        secaoPlano += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoPlano += getValue('planoMedicamentoso') + '\n\n';
    }
    if (getValue('orientacoesDieta')) {
        secaoPlano += `6.3 ORIENTAÇÕES DIETÉTICAS\n`;
        secaoPlano += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoPlano += getValue('orientacoesDieta') + '\n\n';
    }
    if (getValue('orientacoesAtividade')) {
        secaoPlano += `6.4 ORIENTAÇÕES SOBRE ATIVIDADE FÍSICA\n`;
        secaoPlano += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoPlano += getValue('orientacoesAtividade') + '\n\n';
    }
    if (getValue('automonitoramento')) {
        secaoPlano += `6.5 PLANO DE AUTOMONITORAMENTO\n`;
        secaoPlano += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoPlano += getValue('automonitoramento') + '\n\n';
    }
    if (getValue('educacaoDiabetes')) {
        secaoPlano += `6.6 EDUCAÇÃO EM DIABETES\n`;
        secaoPlano += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoPlano += getValue('educacaoDiabetes') + '\n\n';
    }
    if (getValue('examesSolicitados')) {
        secaoPlano += `6.7 EXAMES SOLICITADOS\n`;
        secaoPlano += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoPlano += getValue('examesSolicitados') + '\n\n';
    }
    if (getValue('encaminhamentos')) {
        secaoPlano += `6.8 ENCAMINHAMENTOS\n`;
        secaoPlano += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoPlano += getValue('encaminhamentos') + '\n\n';
    }
    if (getValue('vacinacao')) {
        secaoPlano += `6.9 VACINAÇÃO\n`;
        secaoPlano += `─────────────────────────────────────────────────────────────────────────────\n\n`;
        secaoPlano += getValue('vacinacao') + '\n\n';
    }

    if (secaoPlano) {
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n`;
        prontuario += `6. PLANO TERAPÊUTICO\n`;
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n\n`;
        prontuario += secaoPlano;
    }

    // RETORNO E OBSERVAÇÕES
    let secaoFinal = '';
    secaoFinal += addLine('RETORNO', getValue('retorno'));
    secaoFinal += addBlock('\nOBSERVAÇÕES ADICIONAIS', getValue('observacoes'));

    if (secaoFinal) {
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n`;
        prontuario += `RETORNO E OBSERVAÇÕES\n`;
        prontuario += `═══════════════════════════════════════════════════════════════════════════════\n\n`;
        prontuario += secaoFinal;
    }

    // Rodapé
    prontuario += `\n═══════════════════════════════════════════════════════════════════════════════\n\n`;
    prontuario += `                              Dr. Jorge Cecílio\n`;
    prontuario += `                         CRM: ___________________\n`;
    prontuario += `                    Endocrinologia e Metabolismo\n\n`;
    prontuario += `═══════════════════════════════════════════════════════════════════════════════\n`;

    prontuarioTexto = prontuario;

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
    const nomeArquivo = `Prontuario_${getValue('nome').replace(/\s+/g, '_') || 'Paciente'}_${new Date().toISOString().split('T')[0]}.txt`;
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
    const nomeArquivo = `Prontuario_${getValue('nome').replace(/\s+/g, '_') || 'Paciente'}_${new Date().toISOString().split('T')[0]}.md`;
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

    const nomeArquivo = `Prontuario_${getValue('nome').replace(/\s+/g, '_') || 'Paciente'}_${new Date().toISOString().split('T')[0]}.pdf`;
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
