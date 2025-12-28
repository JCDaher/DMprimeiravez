# Sistema de Atendimento para Pacientes Diabéticos - Dr. Jorge Cecílio

## Visão Geral

Sistema completo para atendimento de pacientes com Diabetes Mellitus (Tipo 1 e Tipo 2), desenvolvido para capturar todas as informações necessárias para um atendimento integral e gerar documentação estruturada para prontuário médico. Suporta consultas iniciais e de seguimento para ambos os tipos de diabetes.

## Tipos de Consultas Disponíveis

### 1. DM Tipo 1 - Consulta Inicial
- Avaliação completa para pacientes em primeira consulta
- Foco em insulinoterapia e esquemas de aplicação
- Avaliação de tecnologias (CGM, bombas de insulina)
- Screening de autoimunidade

### 2. DM Tipo 2 - Consulta Inicial
- Avaliação completa para pacientes em primeira consulta
- Foco em síndrome metabólica e fatores de risco cardiovascular
- Avaliação de medicações orais e injetáveis
- Estratificação de risco

### 3. DM Tipo 1 - Seguimento
- Consulta de retorno para acompanhamento
- Avaliação de controle glicêmico e ajustes de insulina
- Monitoramento de tecnologias
- Avaliação de complicações

### 4. DM Tipo 2 - Seguimento
- Consulta de retorno para acompanhamento
- Avaliação de controle e ajuste de medicações
- Monitoramento de comorbidades
- Avaliação de complicações

## Características Principais

- ✅ 4 tipos de consultas (DM1/DM2 Inicial e Seguimento)
- ✅ Anamnese completa e estruturada
- ✅ Avaliação específica para cada tipo de diabetes
- ✅ Histórico familiar e fatores de risco
- ✅ Avaliação de complicações crônicas
- ✅ Registro de exames complementares
- ✅ Avaliação nutricional e de hábitos de vida
- ✅ Exportação em múltiplos formatos (TXT, MD, PDF)
- ✅ Interface web interativa com seleção de tipo
- ✅ Templates para agentes de IA
- ✅ Prontuários incluem apenas campos preenchidos

## Estrutura do Projeto

```
DMprimeiravez/
├── README.md                 # Este arquivo
├── index.html                # Interface web principal
├── styles.css                # Estilos
├── app.js                    # Lógica da aplicação
├── docs/                     # Documentação do sistema
│   ├── GUIA_USO.md          # Guia de uso detalhado
│   └── PROTOCOLO_CLINICO.md # Protocolo clínico
├── templates/                # Templates de prontuário
│   ├── consulta_dm1.md      # Template para DM Tipo 1
│   ├── consulta_dm2.md      # Template para DM Tipo 2
│   └── consulta_completa.md # Template completo
└── exports/                  # Diretório para exportações
```

## Como Usar

### Opção 1: Interface Web Interativa

**Acesse online:** https://jcdaher.github.io/DMprimeiravez/

Ou abra localmente:
1. Abra o arquivo `index.html` no navegador
2. Preencha o formulário com os dados do paciente
3. Clique em "Gerar Prontuário"
4. Exporte nos formatos desejados (TXT, MD ou PDF)

### Opção 2: Templates Markdown

1. Navegue até `templates/`
2. Escolha o template apropriado (DM1, DM2 ou completo)
3. Preencha manualmente ou use com agente de IA

### Opção 3: Integração com IA

Use os templates como prompt para agentes de IA:
```
Por favor, preencha o template de consulta em templates/consulta_completa.md
com base nas seguintes informações do paciente: [informações]
```

## Áreas Cobertas pelo Sistema

### 1. Identificação e Dados Demográficos
- Dados pessoais completos
- Informações de contato
- Dados ocupacionais

### 2. Queixa Principal e HDA
- Motivo da consulta
- História da doença atual
- Evolução dos sintomas

### 3. História da Diabetes
- Tipo de diabetes
- Tempo de diagnóstico
- Tratamentos prévios
- Controle glicêmico atual

### 4. Histórico Médico
- Comorbidades
- Cirurgias prévias
- Alergias
- Medicações em uso

### 5. Histórico Familiar
- Diabetes em familiares
- Outras doenças relevantes
- Padrão hereditário

### 6. Hábitos de Vida
- Alimentação
- Atividade física
- Tabagismo
- Etilismo
- Padrão de sono

### 7. Avaliação de Complicações
- Retinopatia diabética
- Nefropatia diabética
- Neuropatia diabética
- Doença cardiovascular
- Pé diabético

### 8. Exame Físico
- Dados vitais
- Exame cardiovascular
- Exame neurológico
- Exame dos pés
- IMC e medidas antropométricas

### 9. Exames Complementares
- Glicemia
- HbA1c
- Perfil lipídico
- Função renal
- Função hepática
- Outros exames

### 10. Avaliação e Plano
- Diagnóstico
- Classificação do controle glicêmico
- Metas terapêuticas
- Plano de tratamento
- Orientações
- Retorno

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Markdown
- jsPDF (para exportação em PDF)

## Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para bibliotecas CDN)

## Autor

Sistema desenvolvido para Dr. Jorge Cecílio

## Licença

Uso interno - Sistema médico

## Suporte

Para dúvidas ou sugestões, consulte a documentação em `/docs/`

---

**Versão:** 1.0.0
**Última atualização:** Dezembro 2024
