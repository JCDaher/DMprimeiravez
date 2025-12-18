# Diretório de Exportações

Este diretório é destinado para armazenar os prontuários exportados pelo sistema.

## Formatos Suportados

- `.txt` - Texto simples
- `.md` - Markdown
- `.pdf` - PDF

## Observações Importantes

⚠️ **PRIVACIDADE E SEGURANÇA**

- Este diretório está configurado no `.gitignore` para **não** enviar arquivos de pacientes para o repositório Git
- Arquivos de prontuários contêm dados sensíveis protegidos pela LGPD
- Mantenha os arquivos exportados em local seguro
- Faça backup regular dos prontuários
- Nunca compartilhe prontuários por meios não seguros

## Organização Sugerida

Crie subpastas para organizar por data ou paciente:

```
exports/
├── 2024/
│   ├── 12_dezembro/
│   │   ├── paciente1_18122024.pdf
│   │   └── paciente2_19122024.pdf
│   └── 11_novembro/
└── por_paciente/
    ├── joao_silva/
    └── maria_santos/
```

## Limpeza

Recomenda-se:
- Arquivar prontuários antigos regularmente
- Manter apenas consultas recentes neste diretório
- Fazer backup antes de excluir arquivos
