
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: {
        name: error.name,
        message: error.message
      }
    })
  }
};

export const deleteQuestion = async (req, res) => {

  const {id} = req.params

  try {
    const question = await QuestionAnswer.findById({ _id: id });

    if (!question) {
      return res.status(404).send({
        status: "error",
        message: "Вопрос не найден",
      });
    }
    await question.remove();

    res.status(200).send({
      status: "ok",
      message: "Вопрос успешно удалён",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export const editQuestion = async (req, res) => {

  const { id } = req.params;
  const { data } = req.body;

  try {
    await QuestionAnswer.updateOne({ _id: id }, { $set: data });

    res.status(200).send({
      status: "ok",
      message: "Вопрос успешно отредактирован",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export const getQuestions = async (req, res) => {

  const { shop_id } = req.query;

  try {
    const allQuestions = await QuestionAnswer.find({ shop_id: shop_id });

    res.status(200).send({
      status: "ok",
      message: allQuestions,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export const hideQuestion = async (req, res) => {

  const { id } = req.params;
  const { visible } = req.body;

  try {
    await QuestionAnswer.updateOne({ _id: id}, {visible: visible });

    res.status(200).send({
      status: "ok",
      message: "Запрос выполнен успешно",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}
