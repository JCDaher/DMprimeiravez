# 🩺 Sistema de Atendimento para Pacientes com Diabetes
**Dr. Jorge Cecílio**

Sistema completo para gerenciamento de consultas de pacientes com diabetes tipo 1 e tipo 2.

## 📋 Arquivos do Sistema

### 1. **consulta-inicial.html** - Sistema de Primeira Consulta
Sistema abrangente para registro da primeira consulta de pacientes com diabetes.

#### Funcionalidades:
- ✅ Formulário completo para primeira consulta
- ✅ Suporte para diabetes tipo 1, tipo 2, pré-diabetes e gestacional
- ✅ Coleta detalhada de informações clínicas
- ✅ Exportação para texto estruturado
- ✅ Armazenamento local de consultas
- ✅ Interface responsiva e intuitiva
- ✅ Cálculos automáticos (idade, IMC)

#### Seções do Formulário:
1. **Dados Demográficos** - Nome, idade, sexo, profissão, escolaridade
2. **Tipo de Diabetes e Diagnóstico** - Tipo, data, tempo de diagnóstico
3. **História da Doença Atual** - Queixa principal, sintomas
4. **Controle Glicêmico** - Glicemia, HbA1c, monitoramento, hipoglicemias
5. **Medicações em Uso** - Insulinas, antidiabéticos orais, outros medicamentos
6. **História Médica Pregressa** - Comorbidades, cirurgias, alergias
7. **Histórico Familiar** - Familiares com diabetes e outras doenças
8. **Hábitos de Vida** - Alimentação, exercício, tabagismo, álcool, sono
9. **Exame Físico** - Peso, altura, IMC, PA, FC, exame dos pés
10. **Exames Laboratoriais** - Glicemia, HbA1c, perfil lipídico, função renal
11. **Complicações** - Retinopatia, neuropatia, nefropatia, cardiovascular
12. **Objetivos e Metas** - Metas de HbA1c, glicemia, peso
13. **Plano Terapêutico** - Prescrições, orientações, encaminhamentos
14. **Observações Gerais** - Notas adicionais

#### Como Usar:
1. Abra o arquivo `consulta-inicial.html` no navegador
2. Preencha os campos do formulário conforme a consulta
3. Clique em "Salvar Consulta" para armazenar localmente
4. Use "Exportar para Texto" para gerar documento formatado
5. Copie o texto ou baixe como arquivo .txt

#### Exportação:
O sistema gera um documento de texto estruturado e formatado que pode ser:
- Copiado para prontuário médico eletrônico
- Salvo como arquivo .txt
- Usado como input para agentes de IA
- Impresso para arquivo físico

### 2. **index.html** - Sistema de Gerenciamento Contínuo
Sistema para acompanhamento contínuo de pacientes com diabetes tipo 1.

#### Funcionalidades:
- Cadastro de múltiplos pacientes
- Registro de consultas de acompanhamento
- Controle de HbA1c ao longo do tempo
- Ajustes de doses de insulina
- Registro de intercorrências

## 🚀 Como Começar

1. Clone ou baixe o repositório
2. Abra `consulta-inicial.html` para registrar primeira consulta
3. Abra `index.html` para acompanhamento contínuo
4. Todos os dados são salvos no navegador (localStorage)

## 💾 Armazenamento de Dados

Os dados são armazenados localmente no navegador usando localStorage:
- **Consultas iniciais**: Chave `consultas`
- **Pacientes**: Chave `patients`
- **Registros de acompanhamento**: Chave `registrosDiabetes`

## 🔒 Privacidade

Todos os dados permanecem no computador local. Nenhuma informação é enviada para servidores externos.

## 📱 Compatibilidade

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet
- ✅ Mobile (interface responsiva)

## 🎯 Casos de Uso

1. **Consultório Médico**: Registro estruturado de consultas
2. **Prontuário Eletrônico**: Exportação para sistemas de prontuário
3. **Telemedicina**: Coleta de informações pré-consulta
4. **Agentes de IA**: Geração de input estruturado para análise
5. **Ensino Médico**: Ferramenta educacional para estudantes

## 📄 Formato de Exportação

O texto exportado inclui:
- Formatação clara com separadores visuais
- Todas as seções organizadas
- Data e timestamp
- Assinatura do profissional
- Pronto para impressão ou cópia

## 🛠️ Tecnologias

- HTML5
- CSS3 (com gradientes e animações)
- JavaScript vanilla (sem dependências)
- LocalStorage API

## 📧 Contato

Sistema desenvolvido para **Dr. Jorge Cecílio**
Especialista em Diabetes
