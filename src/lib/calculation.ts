export const calcEPF = (grossSalaryForEPF: number) => {
    const employeeEPF = parseFloat((grossSalaryForEPF * 0.08).toFixed(2));
    const employerEPF = parseFloat((grossSalaryForEPF * 0.12).toFixed(2));
    return {
        employeeEPF,
        employerEPF
    };
};

export const calcETF = (grossSalaryForETF: number) => {
    return parseFloat((grossSalaryForETF * 0.03).toFixed(2));
};

export const calcAPIT = (grossEarnings: number, taxPercentage: number, taxConstant: number) => {
    const tax = (grossEarnings * taxPercentage / 100) - taxConstant;
    return parseFloat(tax.toFixed(2));
};

export const calcNetSalary = (grossEarnings: number, employeeEPF: number, APIT: number) => {
    const netSalary = grossEarnings - employeeEPF - APIT;
    return parseFloat(netSalary.toFixed(2));
};

export const calcCTC = (grossEarnings: number, employerEPF: number, employerETF: number) => {
    const CTC = grossEarnings + employerEPF + employerETF;
    return parseFloat(CTC.toFixed(2));
};

const taxBrackets = [
    { limit: 100000, rate: 0, constant: 0 },
    { limit: 141667, rate: 0.06, constant: 6000 },
    { limit: 183333, rate: 0.12, constant: 14500 },
    { limit: 225000, rate: 0.18, constant: 25500 },
    { limit: 266667, rate: 0.24, constant: 39000 },
    { limit: 308333, rate: 0.30, constant: 55000 },
    { limit: Infinity, rate: 0.36, constant: 73500 },
];

export const calcTax = (grossEarnings: number) => {
    const matchingBracket = taxBrackets.find(bracket => grossEarnings <= bracket.limit);
    if (matchingBracket) {
      return {
        taxRate: matchingBracket.rate,
        taxConstant: matchingBracket.constant,
      };
    } else {
      throw new Error('Invalid gross earnings');
    }
};