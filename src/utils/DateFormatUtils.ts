export function formatData(data: string): string {
    const partes = data.split('-');
    if (partes.length === 3) {
        const [ano, mes, dia] = partes;
        // Lembre-se: meses em JavaScript são indexados de 0 a 11
        const dataFormatada = `${dia}/${parseInt(mes, 10) + 1}/${ano}`;
        return dataFormatada;
    }
    // Se o formato da data de entrada for inválido, retornar a data original
    return data;
}