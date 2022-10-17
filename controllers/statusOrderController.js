
      translations,
    })

    res.status(200).send({
      status: "ok",
      data: newStatus,
    });
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
