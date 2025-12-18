# Guia de Uso - Sistema de Atendimento para Pacientes Diabéticos

## Índice

1. [Introdução](#introdução)
2. [Formas de Uso](#formas-de-uso)
3. [Interface Web Interativa](#interface-web-interativa)
4. [Templates Markdown](#templates-markdown)
5. [Integração com IA](#integração-com-ia)
6. [Exportação de Dados](#exportação-de-dados)
7. [Dicas e Boas Práticas](#dicas-e-boas-práticas)
8. [Solução de Problemas](#solução-de-problemas)

---

## Introdução

Este sistema foi desenvolvido para auxiliar o Dr. Jorge Cecílio no atendimento de pacientes diabéticos em primeira consulta. Ele oferece três formas principais de uso:

1. **Interface Web Interativa** - Formulário digital com preenchimento guiado
2. **Templates Markdown** - Documentos editáveis para preenchimento manual
3. **Integração com IA** - Templates estruturados para uso com agentes de IA

---

## Formas de Uso

### 1. Interface Web Interativa (Recomendado para consultas presenciais)

**Quando usar:**
- Durante a consulta presencial
- Quando precisar de cálculos automáticos (IMC, idade)
- Quando quiser exportar em múltiplos formatos

**Como usar:**
1. Abra o arquivo `src/index.html` no navegador
2. Preencha o formulário seguindo as seções
3. Use os botões de navegação para avançar entre seções
4. Ao final, clique em "Gerar Prontuário"
5. Escolha o formato de exportação desejado

### 2. Templates Markdown (Recomendado para planejamento)

**Quando usar:**
- Para preparação prévia da consulta
- Para revisão de prontuários
- Para impressão e preenchimento manual

**Templates disponíveis:**
- `consulta_completa.md` - Avaliação completa e detalhada
- `consulta_dm1.md` - Específico para Diabetes Tipo 1
- `consulta_dm2.md` - Específico para Diabetes Tipo 2

**Como usar:**
1. Escolha o template apropriado
2. Abra em um editor de texto ou Markdown
3. Preencha os campos marcados com `_____` ou `( )`
4. Salve com um nome descritivo (ex: `Joao_Silva_18122024.md`)

### 3. Integração com IA (Recomendado para otimização)

**Quando usar:**
- Para gerar prontuários baseados em informações não estruturadas
- Para análise de textos de encaminhamento
- Para preenchimento automático de dados

**Como usar:**
Veja a seção [Integração com IA](#integração-com-ia) abaixo.

---

## Interface Web Interativa

### Estrutura das Seções

O formulário está dividido em 4 seções principais:

#### Seção 1: Identificação (Obrigatória)
- Dados pessoais completos
- Informações de contato
- Dados sociodemográficos

**Campos obrigatórios:**
- Nome completo
- Data de nascimento
- Sexo
- Telefone

#### Seção 2: História Clínica
- Queixa principal e HDA
- História da diabetes
- Comorbidades
- Histórico familiar
- Hábitos de vida
- Avaliação de complicações

**Dica:** Esta é a seção mais extensa. Reserve tempo adequado para preenchimento completo.

#### Seção 3: Exame Físico
- Sinais vitais e antropometria
- Exame geral
- Exames por sistema
- Exame detalhado dos pés

**Recursos automáticos:**
- Cálculo automático do IMC
- Cálculo automático da idade

#### Seção 4: Exames e Avaliação
- Exames laboratoriais
- Exames de imagem
- Diagnóstico e avaliação
- Plano terapêutico completo

### Recursos Especiais

#### Campos Condicionais

Alguns campos aparecem/desaparecem baseado em respostas anteriores:

- **Monitorização glicêmica:** Se "Sim", aparece campo de frequência
- **Hipoglicemia:** Se "Sim", aparece campo para detalhes
- **Internações:** Se "Sim", aparece campo para motivo
- **Tabagismo:** Se "Fumante" ou "Ex-fumante", aparece campo de carga tabágica
- **Etilismo:** Se diferente de "Não", aparece campo de frequência

#### Cálculos Automáticos

- **Idade:** Calculada automaticamente ao inserir data de nascimento
- **IMC:** Calculado automaticamente ao inserir peso e altura

#### Validação

O sistema valida campos obrigatórios antes de permitir avançar para a próxima seção.

### Navegação

- **Próximo:** Avança para próxima seção (valida campos obrigatórios)
- **Anterior:** Retorna para seção anterior (sem validação)
- **Gerar Prontuário:** Finaliza e gera o documento (seção 4)

---

## Templates Markdown

### Escolhendo o Template Certo

#### Template Completo (`consulta_completa.md`)
**Use quando:**
- For a primeira consulta e não souber o tipo de diabetes
- Precisar de avaliação abrangente
- Quiser documentar todos os aspectos possíveis

**Características:**
- Mais extenso e detalhado
- Cobre todas as possibilidades
- Ideal para documentação completa

#### Template DM Tipo 1 (`consulta_dm1.md`)
**Use quando:**
- Paciente já tem diagnóstico confirmado de DM1
- Foco em controle insulínico
- Avaliação de tecnologias (CGM, bomba)

**Características:**
- Focado em insulinoterapia
- Detalhes de monitorização
- Screening de autoimunidade
- Manejo de hipoglicemia

#### Template DM Tipo 2 (`consulta_dm2.md`)
**Use quando:**
- Paciente já tem diagnóstico confirmado de DM2
- Foco em síndrome metabólica
- Avaliação de risco cardiovascular

**Características:**
- Focado em comorbidades metabólicas
- Avaliação de risco cardiovascular
- Medicações específicas para DM2
- Estratificação de complicações macrovasculares

### Como Preencher

#### Campos com linhas (`_____`)
Escreva diretamente sobre as linhas:
```markdown
Nome: João da Silva Santos
```

#### Checkboxes (`( )`)
Marque com X os itens aplicáveis:
```markdown
(X) Hipertensão Arterial
( ) Dislipidemia
(X) Obesidade
```

#### Áreas de texto livre
Preencha o espaço após a indicação:
```markdown
Queixa Principal:
Paciente refere poliúria e polidipsia há 3 meses, com perda
ponderal de 8kg no período.
```

### Salvando e Organizando

**Nomenclatura sugerida:**
```
[Nome]_[Data]_[Tipo].md

Exemplos:
Joao_Silva_18122024_DM2.md
Maria_Santos_19122024_Completo.md
```

**Organização de pastas:**
```
/prontuarios
  /2024
    /12_dezembro
      /paciente1
      /paciente2
```

---

## Integração com IA

### Usando com ChatGPT, Claude ou similar

#### Método 1: Geração de Prontuário Completo

**Prompt sugerido:**
```
Você é um assistente médico especializado em endocrinologia.
Preencha o template de primeira consulta para diabetes baseado
nas informações a seguir.

Use o template em: templates/consulta_dm2.md

Informações do paciente:
[Cole as informações não estruturadas aqui]

Instruções:
- Preencha todos os campos possíveis
- Marque campos desconhecidos com "Não informado"
- Seja preciso e objetivo
- Mantenha terminologia médica adequada
```

#### Método 2: Estruturação de Dados

**Prompt sugerido:**
```
Extraia e estruture as seguintes informações de um texto
de encaminhamento médico:

1. Dados de identificação
2. História da diabetes
3. Comorbidades
4. Medicações em uso
5. Exames recentes

Texto:
[Cole o texto de encaminhamento aqui]

Formate a saída de acordo com o template em:
templates/consulta_completa.md
```

#### Método 3: Análise e Sugestões

**Prompt sugerido:**
```
Analise este prontuário de primeira consulta de diabetes e
sugira:

1. Exames complementares necessários
2. Ajustes no plano terapêutico
3. Encaminhamentos importantes
4. Pontos de atenção

Prontuário:
[Cole o prontuário preenchido aqui]
```

### API Integration

Para desenvolvedores que desejam integrar programaticamente:

```javascript
// Exemplo conceitual de integração
const consultaData = {
  identificacao: {...},
  historia: {...},
  exame: {...},
  avaliacao: {...}
};

// Enviar para API de IA
const response = await ai.processConsulta(consultaData);

// Gerar prontuário estruturado
const prontuario = gerarProntuario(response);
```

---

## Exportação de Dados

### Formatos Disponíveis

#### 1. TXT (Texto Simples)
**Características:**
- Formato universal
- Compatível com qualquer sistema
- Mantém formatação básica
- Ideal para sistemas legados

**Quando usar:**
- Para importação em sistemas de prontuário eletrônico
- Para backup simples
- Para impressão em impressoras matriciais

#### 2. MD (Markdown)
**Características:**
- Mantém formatação estruturada
- Editável em qualquer editor de texto
- Versionável (Git)
- Conversível para outros formatos

**Quando usar:**
- Para edição posterior
- Para controle de versão
- Para colaboração em equipe
- Para conversão em HTML/PDF posteriormente

#### 3. PDF (Portable Document Format)
**Características:**
- Formato não editável
- Aparência profissional
- Universal
- Pronto para impressão

**Quando usar:**
- Para arquivo definitivo
- Para envio a outros profissionais
- Para impressão de qualidade
- Para documentação legal

### Copiar para Área de Transferência

O botão "Copiar" permite:
- Colar diretamente em prontuários eletrônicos
- Colar em e-mails
- Colar em documentos Word/Google Docs

---

## Dicas e Boas Práticas

### Durante a Consulta

1. **Prepare-se previamente**
   - Revise o template antes da consulta
   - Tenha exames prévios em mãos
   - Verifique informações de encaminhamento

2. **Priorize o paciente**
   - Não deixe o preenchimento atrapalhar a interação
   - Faça anotações breves e complete depois
   - Use abreviações padronizadas

3. **Seja completo mas eficiente**
   - Foque nos campos mais relevantes
   - Campos opcionais podem ser preenchidos depois
   - Documentação excessiva pode ser contraproducente

### Após a Consulta

1. **Complete as informações**
   - Preencha campos que ficaram pendentes
   - Revise a coerência das informações
   - Adicione observações importantes

2. **Revise antes de finalizar**
   - Verifique nome e dados de identificação
   - Confira medicações e doses
   - Valide diagnósticos e plano

3. **Organize a documentação**
   - Salve com nomenclatura padronizada
   - Faça backup regular
   - Arquive de forma organizada

### Segurança e Privacidade

1. **Dados Sensíveis**
   - Nunca compartilhe prontuários por e-mail não criptografado
   - Use sistemas seguros de armazenamento
   - Respeite a LGPD

2. **Backup**
   - Faça backups regulares
   - Use sistemas redundantes
   - Considere backup em nuvem criptografado

3. **Acesso**
   - Controle quem tem acesso aos prontuários
   - Use senhas fortes
   - Faça logout em computadores compartilhados

---

## Solução de Problemas

### Problemas Comuns

#### O formulário web não abre

**Causas possíveis:**
- Navegador não suporta HTML5
- JavaScript desabilitado
- Arquivo corrompido

**Soluções:**
1. Use um navegador moderno (Chrome, Firefox, Edge)
2. Habilite JavaScript nas configurações
3. Baixe o arquivo novamente

#### Campos não estão aparecendo

**Causa:** Campos condicionais dependem de outras respostas

**Solução:** Verifique se respondeu corretamente as perguntas anteriores que habilitam esses campos

#### IMC não calcula automaticamente

**Causas possíveis:**
- Peso ou altura não preenchidos
- Valores inválidos

**Soluções:**
1. Preencha ambos os campos (peso E altura)
2. Use apenas números
3. Use ponto (.) para decimais, não vírgula

#### Exportação PDF não funciona

**Causas possíveis:**
- Biblioteca jsPDF não carregou
- Bloqueador de pop-ups ativo
- Problema de conexão com CDN

**Soluções:**
1. Verifique sua conexão com internet
2. Desabilite bloqueador de pop-ups
3. Recarregue a página

#### Template Markdown não formata corretamente

**Causa:** Editor não suporta Markdown

**Soluções:**
1. Use editor com suporte a Markdown (VS Code, Typora, etc.)
2. Use visualizadores online (dillinger.io, stackedit.io)
3. Converta para HTML/PDF usando ferramentas apropriadas

### Suporte Técnico

Para problemas não listados aqui:

1. Verifique a documentação completa no README.md
2. Consulte o arquivo PROTOCOLO_CLINICO.md para dúvidas clínicas
3. Revise os comentários no código fonte (src/app.js)

---

## Atualizações e Melhorias Futuras

### Em Desenvolvimento

- Integração direta com sistemas de prontuário eletrônico
- App mobile para preenchimento
- Sincronização em nuvem
- Templates adicionais (gestacional, pediatria)
- Calculadoras integradas (escore de risco, dose de insulina)

### Sugestões

Para sugerir melhorias ou reportar problemas, documente:
1. Descrição detalhada
2. Passos para reproduzir
3. Comportamento esperado vs observado
4. Capturas de tela (se aplicável)

---

**Versão do Guia:** 1.0.0
**Última atualização:** Dezembro 2024
**Desenvolvido para:** Dr. Jorge Cecílio
