import * as Yup from "yup";
import AppError from "../../errors/AppError";
import Company from "../../models/Company";
import User from "../../models/User";
import Setting from "../../models/Setting";
const nodemailer = require('nodemailer');
import { format } from 'date-fns';

interface CompanyData {
  name: string;
  phone?: string;
  email?: string;
  password?: string;
  status?: boolean;
  planId?: number;
  campaignsEnabled?: boolean;
  dueDate?: string;
  recurrence?: string;
}

const CreateCompanyService = async (
  companyData: CompanyData
): Promise<Company> => {
  const {
    name,
    phone,
    email,
    status,
    planId,
    password,
    campaignsEnabled,
    dueDate,
    recurrence
  } = companyData;

  const companySchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Muito curto!")
      .required("Obrigatório")
      .test(
        "Check-unique-name",
        "Já existe uma empresa com esse nome!",
        async value => {
          if (value) {
            const companyWithSameName = await Company.findOne({
              where: { name: value }
            });

            return !companyWithSameName;
          }
          return false;
        }
      ),
    email: Yup.string()
      .required("Obrigatório")
      .test("Check-unique-email", "Já existe uma empresa com esse e-mail!", async (value) => {
        if (value) {
          const companyWithSameEmail = await Company.findOne({
            where: { email: value },
          });

          return !companyWithSameEmail;
        }
        return false;
      }),
  });

  try {
    await companySchema.validate({ name, email });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const company = await Company.create({
    name,
    phone,
    email,
    status,
    planId,
    dueDate,
    recurrence
  });

  const user = await User.create({
    name: company.name,
    email: company.email,
    password: companyData.password,
    profile: "admin",
    companyId: company.id
  });

  let transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false,
    auth: {
      user: 'tecnologia@appsdovale.com.br',
      pass: 'Kn01Qt01#$'
    },
  });

  const dataFormatada = format(new Date(company.createdAt), 'dd/MM/yyyy HH:mm:ss');

  const mailOptions = {
    from: 'tecnologia@appsdovale.com.br',
    to: `may.con.00@hotmail.com`,
    subject: 'Novo cadastro',
    html: `Nome: ${company.name}<br>
          Email: ${company.email}<br>
          Telefone: ${company.phone}<br>
          Data do cadastro: ${dataFormatada}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err)
      console.log(err)
    else
      console.log(info);
  });

  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "asaas"
    },
    defaults: {
      companyId: company.id,
      key: "asaas",
      value: ""
    },
  });

  //tokenixc
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "tokenixc"
    },
    defaults: {
      companyId: company.id,
      key: "tokenixc",
      value: ""
    },
  });

  //ipixc
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "ipixc"
    },
    defaults: {
      companyId: company.id,
      key: "ipixc",
      value: ""
    },
  });

  //ipmkauth
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "ipmkauth"
    },
    defaults: {
      companyId: company.id,
      key: "ipmkauth",
      value: ""
    },
  });

  //clientsecretmkauth
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "clientsecretmkauth"
    },
    defaults: {
      companyId: company.id,
      key: "clientsecretmkauth",
      value: ""
    },
  });

  //clientidmkauth
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "clientidmkauth"
    },
    defaults: {
      companyId: company.id,
      key: "clientidmkauth",
      value: ""
    },
  });

  //CheckMsgIsGroup
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "CheckMsgIsGroup"
    },
    defaults: {
      companyId: company.id,
      key: "enabled",
      value: ""
    },
  });

  //CheckMsgIsGroup
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: ""
    },
    defaults: {
      companyId: company.id,
      key: "call",
      value: "disabled"
    },
  });

  //scheduleType
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "scheduleType"
    },
    defaults: {
      companyId: company.id,
      key: "scheduleType",
      value: "disabled"
    },
  });

  //userRating
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "userRating"
    },
    defaults: {
      companyId: company.id,
      key: "userRating",
      value: "disabled"
    },
  });

  //userRating
  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "chatBotType"
    },
    defaults: {
      companyId: company.id,
      key: "chatBotType",
      value: "text"
    },

  });

  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "tokensgp"
    },
    defaults: {
      companyId: company.id,
      key: "tokensgp",
      value: ""
    },
  });

  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "ipsgp"
    },
    defaults: {
      companyId: company.id,
      key: "ipsgp",
      value: ""
    },
  });

  await Setting.findOrCreate({
    where: {
      companyId: company.id,
      key: "appsgp"
    },
    defaults: {
      companyId: company.id,
      key: "appsgp",
      value: ""
    },
  });

  if (companyData.campaignsEnabled !== undefined) {
    const [setting, created] = await Setting.findOrCreate({
      where: {
        companyId: company.id,
        key: "campaignsEnabled"
      },
      defaults: {
        companyId: company.id,
        key: "campaignsEnabled",
        value: `${campaignsEnabled}`
      },

    });
    if (!created) {
      await setting.update({ value: `${campaignsEnabled}` });
    }
  }

  return company;
};

export default CreateCompanyService;