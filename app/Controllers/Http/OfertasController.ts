import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oferta from 'App/Models/Oferta'
import StoreOfertaValidator from 'App/Validators/StoreOfertaValidator'

export default class OfertasController {
  public async index({}: HttpContextContract) {
    const ofertaDB = await Oferta.all()
    return ofertaDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreOfertaValidator)
    const ofertaDB = await Oferta.create({...data, userId: auth.user?.id})
    return ofertaDB
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const ofertaDB = await Oferta.findOrFail(params.id)
      return ofertaDB
    } catch (error) {
      response.status(400).send("Oferta não encontrada!!!")
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
     try {
      const ofertaDB = await Oferta.findOrFail(params.id)
      const { nome, preco, link } = await request.validate(StoreOfertaValidator)
      ofertaDB.nome = nome
      ofertaDB.preco = preco
      ofertaDB.link = link
      await ofertaDB.save()
      return ofertaDB
     } catch (error) {
      response.status(400).send("Oferta não encontrada!!!")
     }

  }

  public async destroy({ params, response}: HttpContextContract) {
    try {
      const ofertaDB = await Oferta.findOrFail(params.id)
      await ofertaDB.delete()
      return ofertaDB
    } catch (error) {
      response.status(400).send("Oferta não encontrada!!!")
    }
  }
}
