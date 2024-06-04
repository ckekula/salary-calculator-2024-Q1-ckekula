export const calcEPF = (grossSalaryForEPF: number) => {
    const employeeEPF = parseFloat((grossSalaryForEPF * 0.08).toFixed(2));
    const employerEPF = parseFloat((grossSalaryForEPF * 0.12).toFixed(2));
    return {
        employeeEPF,
        employerEPF
    }
}

export const calcETF = (grossSalaryForETF: number) => {
    return parseFloat((grossSalaryForETF * 0.03).toFixed(2));
}

export const calcAPIT = (grossEarnings: number, taxPercentage: number, taxConstant: number) => {
    const tax = (grossEarnings * taxPercentage / 100) - taxConstant;
    return parseFloat(tax.toFixed(2));
}

export const calcNetSalary = (grossEarnings: number, employeeEPF: number, APIT: number) => {
    const netSalary = grossEarnings - employeeEPF - APIT;
    return parseFloat(netSalary.toFixed(2));
}

export const calcCTC = (grossEarnings: number, employerEPF: number, employerETF: number) => {
    const CTC = grossEarnings + employerEPF + employerETF;
    return parseFloat(CTC.toFixed(2));
}
