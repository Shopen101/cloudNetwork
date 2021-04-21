const { Router } = require('express')
const router = Router()

const Chart = require('../models/Chart')

router.post('/saveSchemaInDB', async (req, res) => {
    try {
        const { schemaName, schema, userId } = req.body
        const allUserSchemes = await Chart.find({ ownerId: userId })
        const candidate = allUserSchemes.find(schema => schema.name === schemaName)

        if (candidate) {
            candidate.nodes = schema.nodes
            candidate.links = schema.links
            await candidate.save()
            res.status(200).json({ message: 'Схема данных успешно обновлена!' })
        } else {
            const chart = new Chart({
                ownerId: userId,
                name: schemaName,
                nodes: schema.nodes,
                links: schema.links,
            })

            await chart.save()
            res.status(201).json({ message: 'Схема успешно сохранена!' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        console.log(`server error - ${error}`)
    }
})

router.get('/getSchema/getAllUsersSchemes/:userId', async (req, res) => {
    try {
        const usersSchemesNames = []
        const { userId } = req.params
        const allSchemes = await Chart.find({ ownerId: userId })
        allSchemes.forEach(scheme => usersSchemesNames.push(scheme))

        res.status(201).json({ message: usersSchemesNames })
    } catch (error) {
        res.status(500).json({ message: 'find schema err' })
        console.log(`server error - ${error}`)
    }
})

router.post('/getSchema/getSchemaFromName', async (req, res) => {
    try {
        const { schemaId, userId } = req.body
        const allSchemes = await Chart.find({ ownerId: userId })

        const selectedSchema = allSchemes.find(schema => schema.id === schemaId)
        selectedSchema && res.status(201).json({ message: selectedSchema })
    } catch (error) {
        res.status(500).json({ message: 'read schema err' })
        console.log(`server error - ${error}`)
    }
})

module.exports = router
